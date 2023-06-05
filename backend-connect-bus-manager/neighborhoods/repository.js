import admin from 'firebase-admin';

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class NeighborhoodRepository {
  /**
 * Retorna todos os Bairros do banco
 * @returns Promise
 */
  listAll() {
    return admin.firestore()
      .collection('Neighborhoods')
      .orderBy("name", "asc")
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      })
  }

  /**
 * Busca no banco todos os bairros que tem os nomes parecidos
 * @param {string} name 
 * @returns Promise
 */
  findByName(name) {
    return admin.firestore()
      .collection("Neighborhoods")
      .where("name", ">=", name)
      .orderBy("name", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  }

  /**
 * Encontra o bairro pelo ID do documento
 * @param {string} id 
 * @returns Promise
 */
  findByDocID(id) {
    return admin.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        }
      });
  }

  /**
 * Adiciona no banco um bairro novo com o ID do documento gerado automaticamente
 * @param {string} name 
 * @returns 
 */
  create(name) {
    return firebase.firestore()
      .collection("Neighborhoods")
      .add({
        name: name
      })
  }
}