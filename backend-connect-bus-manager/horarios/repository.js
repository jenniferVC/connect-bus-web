import admin from "firebase-admin";

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class HorarioRepository {
  /**
   * Retorna todos os Horarios do banco
   * @returns Promise
   */
  listAll() {
    return admin
      .firestore()
      .collection("Horarios")
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