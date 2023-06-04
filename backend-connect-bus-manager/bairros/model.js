import admin from 'firebase-admin';
// Camada de Modelo 
// - Contém a logica e as regras de negócio
// - Converte dados em algo que faz sentido para o meu negocio

export class Bairro {
  name;

  listAll() {
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
    if (!this.name) {
      return Promise.reject({
        code: 500,
        message: "Nome de bairro nao informado"
      })
    }

    return admin.firestore()
      .collection("Bairros")
      .where("nomeBairro", ">=", this.name)
      .orderBy("nomeBairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  }
}