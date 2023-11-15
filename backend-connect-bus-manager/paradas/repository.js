import admin from "firebase-admin";
import { Parada } from "./model.js";
import { NeighborhoodRepository } from "../neighborhoods/repository.js";

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class ParadaRepository {
  listAll() {
    return admin
      .firestore()
      .collection("Paradas")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          bairro: doc.data()["bairro"],
          latitude: doc.data()["latitude"],
          longitude: doc.data()["longitude"],
        }));
      });
  }

  /**
   * Adiciona no banco uma parada nova com o ID do documento gerado automaticamente
   * @param {Parada} parada
   * @returns
   */
  create(parada) {
    return admin
      .firestore()
      .collection("Paradas")
      .add(JSON.parse(JSON.stringify(parada)));
  }

  /**
   * Encontra a parada pelo ID do documento
   * @param {string} id
   * @returns
   */
  findByDocID(id) {
    return admin
      .firestore()
      .collection("Paradas")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  }

  /**
   * Atualiza a parada
   * @param {Parada} parada
   * @returns
   */
  update(parada) {
    return admin.firestore().collection("Paradas").doc(parada.docID).update({
      bairro: parada.bairro,
      latitude: parada.latitude,
      longitude: parada.longitude,
    });
  }

  /**
   * Busca no banco todos os horarios que tem as linhas parecidas
   * @param {string} bairro
   * @returns Promise
   */
  findByBairro(bairro) {
    return admin
      .firestore()
      .collection("Paradas")
      .where("bairro", ">=", bairro)
      .orderBy("bairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  }

  /**
   *
   * @param {string} id
   * @returns Promise
   */
  delete(id) {
    return admin.firestore().collection("Paradas").doc(id).delete();
  }

  /**
   * Conta a quantidade de Bairros cadastrados no Firebase.
   * @param {string} docIdBairro
   * @returns int
   */
  async qtdParadas(docIdBairro) {
    const collectionRef = admin
      .firestore()
      .collection(`Bairros/${docIdBairro}/Paradas`);
    const snapshot = await collectionRef.count().get();
    return snapshot.data().count;
  }

  /**
   *
   * @param {string} docIdBairro
   * @param {string} docIdParada
   */
  async generateIdParada(docIdBairro, docIdParada) {
    const bairroRef = admin.firestore().collection("Bairros").doc(docIdBairro);
    const paradaRef = admin
      .firestore()
      .collection("Bairros")
      .doc(docIdBairro)
      .collection("Paradas")
      .doc(docIdParada);
    try {
      await admin.firestore().runTransaction(async (t) => {
        const bairroDoc = await t.get(bairroRef);
        const newParada = bairroDoc.data().qtdParadas + 1;
        const idParada = bairroDoc.data().numBairro + "." + newParada;

        t.set(bairroRef, { qtdParadas: newParada }, { merge: true });
        t.set(paradaRef, { id: idParada }, { merge: true });
      });
      console.log("Transaction success!");
    } catch (e) {
      console.log("Transaction failure:", e);
    }
  }
}
