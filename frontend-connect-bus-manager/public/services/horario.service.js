firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      window.localStorage.setItem("auth", token);
    });
  }
});

/**
 *
 * @param {Horario} horario
 * @returns
 */
function validateHorario(horario) {
  const linha = horario.linha;
  const diaDeFuncionamento = horario.diaDeFuncionamento;
  const bairros = horario.bairros;
  const horaPartidaBairro = horario.horaPartidaBairro;
  const horaPartidaRodoviaria = horario.horaPartidaRodoviaria;

  if (!linha) {
    return Promise.reject("Linha não informado");
  }
  if (!diaDeFuncionamento) {
    return Promise.reject("Dia de funcionamento não informado");
  }
  if (!bairros) {
    return Promise.reject("Bairro não informado");
  }
  if (!horaPartidaBairro) {
    return Promise.reject("Hora partida do bairro não informado");
  }
  if (!horaPartidaRodoviaria) {
    return Promise.reject("Hora partida da rodoviária não informado");
  }

  return Promise.resolve(horario);
}

/**
 * Service de Horario criado para manipular os acessos ao banco Firestore
 */
const horarioService = {
  /**
   * Retorna todos os Horarios do banco
   * @returns Promise
   */
  getAll() {
    return firebase
      .firestore()
      .collection("Horarios")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
      });
  },

  /**
   * Adiciona no banco um horario novo com o ID do documento gerado automaticamente
   * @param {Horario} horario
   * @returns
   */
  create(horario) {
    console.log("horario salvo no banco:", JSON.parse(JSON.stringify(horario)));
    return validateHorario(horario).then(() => {
      return firebase
        .firestore()
        .collection("Horarios")
        .add(JSON.parse(JSON.stringify(horario)));
    });
  },

  /**
   * Encontra o horario pelo ID do documento
   * @param {string} id
   * @returns
   */
  findByDocID(id) {
    return firebase
      .firestore()
      .collection("Horarios")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  },

  /**
   * Atualiza o horario
   * @param {Horario} horario
   * @returns
   */
  update(horario) {
    return validateHorario(horario).then(() => {
      return firebase
        .firestore()
        .collection("Horarios")
        .doc(horario.docID)
        .update({
          linha: horario.linha,
          diaDeFuncionamento: horario.diaDeFuncionamento,
          bairros: horario.bairros,
          horaPartidaBairro: horario.horaPartidaBairro,
          horaPartidaRodoviaria: horario.horaPartidaRodoviaria,
        });
    });
  },

  /**
   * Busca no banco todos os horarios que tem as linhas parecidas
   * @param {string} linha
   * @returns Promise
   */
  findByLinha(linha) {
    return firebase
      .firestore()
      .collection("Horarios")
      .where("linha", ">=", linha)
      .orderBy("linha", "asc")
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
    return firebase.firestore().collection("Horarios").doc(id).delete();
  },
};
