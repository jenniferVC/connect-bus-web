import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from './middlewares/authenticate-jwt.js';

const app = express();

/**
 * Referenciando o arquivo `serviceAccountKey.json` que
 * possui as credenciais que por sua vez permite que esse back-end faça 
 * chamadas para o firestore.
 */
admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json'),
  databaseURL: "https://connectbus-7d8d9-default-rtdb.firebaseio.com"
});



//
// https://expressjs.com/en/guide/routing.html
//
app.get('/bairros', authenticateToken, (request, response) => {
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

})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'))



