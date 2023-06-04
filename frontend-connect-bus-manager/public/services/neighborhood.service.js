/**
 * Service de Bairro criado para manipular os acessos ao banco Firestore
 */
const neighborhoodService = {
  /**
   * Retorna todos os Bairros do banco
   * @returns Promise
   */
  getAll: () => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .orderBy("name", "asc")
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
      .collection("Neighborhoods")
      .where("name", ">=", name)
      .orderBy("name", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   * 
   * @param {string} name 
   * @returns 
   */
  findByEqualName: name => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .where("name", "==", name)
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
      .collection("Neighborhoods")
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
   * @param {string} name 
   * @returns 
   */
  create: name => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .add({
        name: name
      })
  },
  /**
   * 
   * @param {string} id 
   * @param {string} name 
   * @returns 
   */
  update: (id, name) => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .update({
        name: name
      })
  },
  /**
   * 
   * @param {string} id 
   * @returns Promise
   */
  delete: id => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .delete();
  }
}