import express from 'express';

const app = express();

// URL: https://connectbus-7d8d9.web.app/pages/bairros/list/list-bairros.html

//
// https://expressjs.com/en/guide/routing.html
//
app.get('/bairros', (request, response) => {
  console.log('GET bairros');
  response.json([{id: 1}]);
})

app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'))