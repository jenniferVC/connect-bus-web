import admin from "firebase-admin";
import { Horario } from "./model.js";

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class HorarioRepository {
  /**
   * Retorna todos os Horarios do banco
   * @returns Promise
   */
  async listAll() {
    return admin
      .firestore()
      .collection("Horarios")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  }

  /**
   * Adiciona no banco um horario novo com o ID do documento gerado automaticamente
   * @param {Horario} horario
   * @returns
   */
  create(horario) {
    console.log("horario salvo no banco:", JSON.parse(JSON.stringify(horario)));
    return admin
      .firestore()
      .collection("Horarios")
      .add(JSON.parse(JSON.stringify(horario)));
  }

  /**
   * Encontra o horario pelo ID do documento
   * @param {string} id
   * @returns
   */
  findByDocID(id) {
    return admin
      .firestore()
      .collection("Horarios")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  }

  /**
   * Atualiza o horario
   * @param {Horario} horario
   * @returns
   */
  update(horario) {
    return admin.firestore().collection("Horarios").doc(horario.docID).update({
      linha: horario.linha,
      diaDeFuncionamento: horario.diaDeFuncionamento,
      bairros: horario.bairros,
      horaPartidaBairro: horario.horaPartidaBairro,
      horaPartidaRodoviaria: horario.horaPartidaRodoviaria,
    });
  }

    /**
   * Busca no banco todos os horarios que tem as linhas parecidas
   * @param {string} linha
   * @returns Promise
   */
    findByLinha(linha) {
      return admin
        .firestore()
        .collection("Horarios")
        .where("linha", ">=", linha)
        .orderBy("linha", "asc")
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }));
        });
    }
}
