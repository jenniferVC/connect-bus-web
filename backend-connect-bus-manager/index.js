import express from 'express';
import admin from 'firebase-admin';

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
app.get('/bairros', async (request, response) => {
  // Quando o front-end enviar para o backend o JWT, será 
  // enviado dentro do header authorization
  const jwt = request.headers.authorization;

  // Caso nao tenha um JWT então é retornado o codigo de erro 
  // 401 e uma mensagem de nao autorizado
  if (!jwt) {
    response.status(401).json({ message: 'Usuário não autorizado' });
    return;
  }

  let decodedIdToken = "";
  try {
    // Função que verifica se o JWT é valido e 
    //'true' para verificar se nao expirou.
    decodedIdToken = await admin.auth().verifyIdToken(jwt, true);
  } catch (error) {
    // Se a autenticação com JWT der erro vai cair no catch
    // e retornar o codigo 401
    response.status(401).json({ message: 'Usuário não autorizado' });
    return;
  }

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



