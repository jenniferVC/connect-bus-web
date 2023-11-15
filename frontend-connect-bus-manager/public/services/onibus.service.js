firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      window.localStorage.setItem("auth", token);
    });
  }
});

/**
 *
 * @param {Onibus} onibus
 * @returns
 */
function validateOnibus(onibus) {
  const codigo = onibus.codigo;
  const estadoFisico = onibus.estadoFisico;
  const linha = onibus.linha;

  if (!codigo) {
    return Promise.reject("Código não informado");
  }
  if (!estadoFisico) {
    return Promise.reject("Estado físico não informado");
  }
  if (!linha) {
    return Promise.reject("Linha não informada");
  }

  return Promise.resolve(onibus);
}

/**
 * Service de Parada criado para manipular os acessos ao banco Firestore
 */
const onibusService = {
  /**
   * Retorna todos as Paradas do banco
   * @returns Promise
   */
  getAll: () => {
    return firebase
      .firestore()
      .collection("Onibus")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          codigo: doc.data()["codigo"],
          estadoFisico: doc.data()["estadoFisico"],
          linha: doc.data()["linha"],
          latitude: doc.data()["latitude"],
          longitude: doc.data()["longitude"],
        }));
      });
  },

  /**
   * Adiciona no banco um item novo com o ID do documento gerado automaticamente
   * @param {Onibus} onibus
   * @returns
   */
  create(onibus) {
    return validateOnibus(onibus).then(() => {
      return firebase.firestore().collection("Onibus").add({
        codigo: onibus.codigo,
        estadoFisico: onibus.estadoFisico,
        linha: onibus.linha,
        latitude: onibus.latitude,
        longitude: onibus.longitude,
      });
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
      .collection("Onibus")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  },

  /**
   * Atualiza o item
   * @param {Onibus} onibus
   * @returns
   */
  update(onibus) {
    return validateOnibus(onibus).then(() => {
      return firebase
        .firestore()
        .collection("Onibus")
        .doc(onibus.docId)
        .update({
          codigo: onibus.codigo,
          linha: onibus.linha,
          estadoFisico: onibus.estadoFisico,
        });
    });
  },

  /**
   * Busca no banco todos os onibus que tem os codigos parecidos
   * @param {string} codigo
   * @returns Promise
   */
  findByCode(codigo) {
    return firebase
      .firestore()
      .collection("Onibus")
      .where("codigo", ">=", codigo)
      .orderBy("codigo", "asc")
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
    return firebase.firestore().collection("Onibus").doc(id).delete();
  },
};
