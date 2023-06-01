import admin from 'firebase-admin';

export async function authenticateToken(request, response, next) {
  // Quando o front-end enviar para o backend o JWT, será 
  // enviado dentro do header authorization
  const jwt = request.headers.authorization;

  // Caso nao tenha um JWT então é retornado o codigo de erro 
  // 401 e uma mensagem de nao autorizado
  if (!jwt) {
    response.status(401).json({ message: '1Usuário não autorizado' });
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
    response.status(401).json({ message: '2Usuário não autorizado' });
    return;
  }

  request.user = {
    uid: decodedIdToken.sub
  }

  next();
}