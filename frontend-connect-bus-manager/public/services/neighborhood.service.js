firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      window.localStorage.setItem("auth", token);
    });
  }
});

function validateNeighborhood(bairro) {
  const nome = bairro.nome;
  if (!nome) {
    return Promise.reject("Nome não informado");
  }
  return Promise.resolve(bairro);
}
/**
 * Service de Bairro criado para manipular os acessos ao banco Firestore
 */
const neighborhoodService = {
  /**
   * Retorna todos os Bairros do banco
   * @returns Promise
   */
  getAll: () => {
    return firebase
      .firestore()
      .collection("Bairros")
      .orderBy("nome", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  },
    /**
   * Busca no banco todos os bairros que tem os nomes parecidos
   * @param {string} nome
   * @returns Promise
   */
  findByName: (nome) => {
    return firebase
      .firestore()
      .collection("Bairros")
      .where("nome", ">=", nome)
      .orderBy("nome", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  },
  /**
   * Encontra o bairro pelo ID do documento
   * @param {string} id
   * @returns Promise
   */
  findByDocId: (id) => {
    return firebase
      .firestore()
      .collection("Bairros")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return {
            nome: doc.data()["nome"],
            docId: doc.id,
          };
        }
      });
  },
  /**
   * Busca no banco todos os bairros que tem os nomes exatamente igual
   * @param {string} nome
   * @returns
   */
  findByEqualName(nome) {
    return firebase
      .firestore()
      .collection("Bairros")
      .where("nome", "==", nome)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   * Adiciona no banco um bairro novo com o ID do documento gerado automaticamente
   * @param {Neighborhood} bairro
   * @returns
   */
  create: (bairro) => {
    console.log("bairro salvo no banco:", JSON.parse(JSON.stringify(bairro)));
    return validateNeighborhood(bairro).then(() => {
      return firebase.firestore().collection("Bairros").add({
        nome: bairro.nome,
      });
    });
  },
  /**
   * Atualiza o bairro
   * @param {Neighborhood} bairro
   * @returns
   */
  update: (bairro) => {
    return validateNeighborhood(bairro).then(() => {
      return firebase
        .firestore()
        .collection("Bairros")
        .doc(bairro.docId)
        .update({
          nome: bairro.nome,
        });
    });
  },
  /**
   *
   * @param {string} id
   * @returns Promise
   */
  delete: (id) => {
    return firebase.firestore().collection("Bairros").doc(id).delete();
  },
};

