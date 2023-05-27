/**
 * Service de Bairro criado para manipular os acessos ao banco Firestore
 */
const bairroService = {
  /**
   * Retorna todos os Bairros do banco
   * @returns Promise
   */
  getAll: () => {
    return firebase.firestore()
      .collection("Bairros")
      .orderBy("nomeBairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   * 
   * @param {string} name 
   * @returns Promise
   */
  findByName: name => {
    return firebase.firestore()
      .collection("Bairros")
      .where("nomeBairro", ">=", name)
      .orderBy("nomeBairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  findByEqualName: name => {
    return firebase.firestore()
      .collection("Bairros")
      .where("nomeBairro", "==", name)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   * 
   * @param {string} id 
   * @returns Promise
   */
  findByID: id => {
    return firebase.firestore()
      .collection("Bairros")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        }
      })
  },
  /**
   * 
   * @param {Bairro} bairro 
   * @returns Promise
   */
  delete: bairro => {
    return firebase.firestore()
      .collection("Bairros")
      .doc(bairro.id)
      .delete();
  }
}