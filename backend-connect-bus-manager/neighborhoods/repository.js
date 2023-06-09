import admin from 'firebase-admin';
import { Neighborhood } from './model';

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
          docId: doc.id
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
 * Busca no banco todos os bairros que tem os nomes exatamente igual
 * @param {string} name 
 * @returns 
 */
  findByEqualName(name) {
    return admin.firestore()
      .collection("Neighborhoods")
      .where("name", "==", name)
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
    return admin.firestore()
      .collection("Neighborhoods")
      .add(JSON.parse(JSON.stringify(bairro)))
  }

    /**
   * Atualiza o bairro
   * @param {Neighborhood} bairro 
   * @returns 
   */
    update (bairro) {
      return admin.firestore()
        .collection("Neighborhoods")
        .doc(bairro.docID)
        .update({
          name: bairro.name
        })
    }
}