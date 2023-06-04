import admin from 'firebase-admin';

// Camada de Repositório
// - Contém a lógica de acesso aos dados necessária para a aplicacao funcionar
// sejam dados obtidos em banco de dados ou de outra API qualquer.

export class BairroRepository {
  listAll(){
    return admin.firestore()
    .collection('Bairros')
    .orderBy("nomeBairro", "asc")
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
      .collection("Bairros")
      .where("nomeBairro", ">=", name)
      .orderBy("nomeBairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  }
}