// Controller é responsavel por receber a requisição do servidor
// e retornar uma  resposta para o cliente

import admin from 'firebase-admin';


export class BairrosController {
  listAll (request, response) {
    console.log('GET bairros');
    admin.firestore()
      .collection('Bairros')
      .orderBy("nomeBairro", "asc")
      .get()
      .then(snapshot => {
        const bairros = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        response.json(bairros);
      })
  }
}