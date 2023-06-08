import express, { json } from 'express';
import admin from 'firebase-admin';
import { neighborhoodsRouter } from './neighborhoods/routes.js';

const app = express();
app.use(json());


/**
 * Referenciando o arquivo `serviceAccountKey.json` que
 * possui as credenciais que por sua vez permite que esse back-end faça 
 * chamadas para o firestore.
 */
admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json'),
  databaseURL: "https://connectbus-7d8d9-default-rtdb.firebaseio.com"
});



app.use('/bairros', neighborhoodsRouter);

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'))



