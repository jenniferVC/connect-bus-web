import express, { json } from 'express';
import admin from 'firebase-admin';
import { neighborhoodsRouter } from './neighborhoods/routes.js';
import { paradasRouter } from './paradas/routes.js';
import { horariosRouter } from './horarios/routes.js';

const app = express();
app.use(json());


/**
 * Referenciando o arquivo `serviceAccountKey.json` que
 * possui as credenciais que por sua vez permite que esse back-end faça 
 * chamadas para o firestore.
 */
admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json'),
  // databaseURL: "https://connectbus-7d8d9-default-rtdb.firebaseio.com"
});

app.use((request, response, next) => {
  // TODO: allow only secure origins
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})



app.use('/bairros', neighborhoodsRouter);
app.use('/paradas', paradasRouter);
app.use('/horarios', horariosRouter);



app.listen(5000, () => console.log('API rest iniciada em http://localhost:5000'))



