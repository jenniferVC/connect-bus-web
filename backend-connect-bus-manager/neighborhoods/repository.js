import admin from "firebase-admin";
import { Neighborhood } from "./model.js";

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class NeighborhoodRepository {
  /**
   * Retorna todos os Bairros do banco
   * @returns Promise
   */
  listAll() {
    return admin
      .firestore()
      .collection("Bairros")
      .orderBy("nome", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  }

  /**
   * Busca no banco todos os bairros que tem os nomes parecidos
   * @param {string} nome
   * @returns Promise
   */
  findByName(nome) {
    return admin
      .firestore()
      .collection("Bairros")
      .where("nome", ">=", nome)
      .orderBy("nome", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  }

  /**
   * Encontra o bairro pelo ID do documento
   * @param {string} id
   * @returns Promise
   */
  findByDocID(id) {
    return admin
      .firestore()
      .collection("Bairros")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  }

  /**
   * Busca no banco todos os bairros que tem os nomes exatamente igual
   * @param {string} nome
   * @returns
   */
  findByEqualName(nome) {
    return admin
      .firestore()
      .collection("Bairros")
      .where("nome", "==", nome)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  }

  /**
   * Adiciona no banco um bairro novo com o ID do documento gerado automaticamente
   * @param {Neighborhood} bairro
   * @returns
   */
  create(bairro) {
    console.log("bairro salvo no banco:", JSON.parse(JSON.stringify(bairro)));
    return admin
      .firestore()
      .collection("Bairros")
      .add(JSON.parse(JSON.stringify(bairro)));
  }

  /**
   * Conta a quantidade de Bairros cadastrados no Firebase.
   * @returns int
   */
  async qtdBairros() {
    const collectionRef = admin.firestore().collection("Bairros");
    const snapshot = await collectionRef.count().get();
    return snapshot.data().count;
  }

  /**
   * Atualiza o bairro
   * @param {Neighborhood} bairro
   * @returns
   */
  update(bairro) {
    return admin.firestore().collection("Bairros").doc(bairro.docID).update({
      nome: bairro.nome,
    });
  }

  /**
   *
   * @param {string} id
   * @returns Promise
   */
  delete(id) {
    return admin.firestore().collection("Bairros").doc(id).delete();
  }
}
