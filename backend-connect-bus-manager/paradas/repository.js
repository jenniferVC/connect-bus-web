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
   * @param {string} docIdBairro
   * @returns
   */
  create(parada, docIdBairro) {
    return admin
      .firestore()
      .collection(`Bairros/${docIdBairro}/Paradas`)
      .add(JSON.parse(JSON.stringify(parada)));
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
