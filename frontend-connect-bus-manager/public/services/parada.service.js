firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      window.localStorage.setItem("auth", token);
    });
  }
});

function validateParada(parada) {
  const bairro = parada.bairro;
  const latitude = parada.latitude;
  const longitude = parada.longitude;

  if (!bairro) {
    return Promise.reject("Bairro não informado");
  }
  if (!latitude) {
    return Promise.reject("Latitude não informado");
  }
  if (!longitude) {
    return Promise.reject("Longitude não informado");
  }

  return Promise.resolve(parada);
}

/**
 * Service de Parada criado para manipular os acessos ao banco Firestore
 */
const paradaService = {
  /**
   * Retorna todos as Paradas do banco
   * @returns Promise
   */
  getAll: () => {
    return firebase
      .firestore()
      .collection("Paradas")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          bairro: doc.data()["bairro"],
          latitude: doc.data()["latitude"],
          longitude: doc.data()["longitude"],
        }));
      });
  },

  /**
   * Adiciona no banco uma parada nova com o ID do documento gerado automaticamente
   * @param {Parada} parada
   * @returns
   */
  create(parada) {
    return validateParada(parada).then(() => {
      return firebase
        .firestore()
        .collection("Paradas")
        .add(JSON.parse(JSON.stringify(parada)));
    });
  },

  /**
   * Encontra a parada pelo ID do documento
   * @param {string} id
   * @returns
   */
  findByDocID(id) {
    return firebase
      .firestore()
      .collection("Paradas")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  },

  /**
   * Atualiza a parada
   * @param {Parada} parada
   * @returns
   */
  update(parada) {
    return validateParada(parada).then(() => {
      return firebase
        .firestore()
        .collection("Paradas")
        .doc(parada.docId)
        .update({
          bairro: parada.bairro,
          latitude: parada.latitude,
          longitude: parada.longitude,
        });
    });
  },

  /**
   * Busca no banco todos os horarios que tem as linhas parecidas
   * @param {string} bairro
   * @returns Promise
   */
  findByBairro(bairro) {
    return firebase
      .firestore()
      .collection("Paradas")
      .where("bairro", ">=", bairro)
      .orderBy("bairro", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  },

  /**
   *
   * @param {string} id
   * @returns Promise
   */
  delete(id) {
    return firebase.firestore().collection("Paradas").doc(id).delete();
  },
};
