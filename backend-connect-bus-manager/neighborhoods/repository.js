import admin from 'firebase-admin';

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class NeighborhoodRepository {
  listAll(){
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
}