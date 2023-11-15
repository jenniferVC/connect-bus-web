firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then((token) => {
      window.localStorage.setItem("auth", token);
    });
  }
});
/**
 * Service de Parada criado para manipular os acessos ao banco Firestore
 */
const paradaService = {
  /**
   * Retorna todos as Paradas do banco
   * @returns Promise
   */
  getAll: () => {
    return callApi({ method: "GET", url: "http://localhost:5000/paradas" });
  },
  /**
   *
   * @param {Parada} parada
   * @returns
   */
  create: (parada) => {
    return callApi({
      method: "POST",
      url: "http://localhost:5000/paradas/novo",
      params: parada,
    });
  },
  /**
   *
   * @param {string} bairro
   * @returns Promise
   */
  findByBairro: (bairro) => {
    return callApi({
      method: "GET",
      url: `http://localhost:5000/paradas/encontrar/${bairro}`,
    });
  },
  /**
   *
   *
   * @param {string} docId
   * @returns Promise
   */
  findByDocId: (docId) => {
    return callApi({
      method: "GET",
      url: `http://localhost:5000/paradas/${docId}`,
    });
  },
  /**
   *
   * @param {Parada} parada
   * @returns
   */
  update: (parada) => {
    return callApi({
      method: "POST",
      url: `http://localhost:5000/paradas/update/${parada.docId}`,
      params: parada,
    });
  },
    /**
   *
   * @param {string} id
   * @returns Promise
   */
    delete: (id) => {
      return callApi({
        method: "POST",
        url: `http://localhost:5000/paradas/delete/${id}`,
      });
    },
};

function callApi({ method, url, params }) {
  return new Promise((resolve, reject) => {
    // XMLHttpRequest permite que façamos chamadas ao backend usando ajax
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    let token = window.localStorage.getItem("auth");
    // Enviando o JWT do usuario logado no Cabeçalho
    xhr.setRequestHeader("Authorization", token);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Quando o estado de pronto da chamada modificar
    xhr.onreadystatechange = function () {
      // readyState igual a 4 significa que a chamada foi finalizada
      if (this.readyState == 4) {
        const json = JSON.parse(this.responseText);
        if (this.status != 200) {
          reject(json);
        } else {
          resolve(json);
        }
      }
    };

    console.log(JSON.stringify(params));
    // Enviando a chamada para o backend
    xhr.send(JSON.stringify(params));
  });
}
