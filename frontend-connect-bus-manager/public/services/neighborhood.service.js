// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     user.getIdToken().then((token) => {
//       window.localStorage.setItem("auth", token);
//     });
//   }
// });
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
      .collection("Neighborhoods")
      .orderBy("name", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   *
   * @param {string} name
   * @returns Promise
   */
  findByName: (name) => {
    return firebase
      .firestore()
      .collection("Neighborhoods")
      .where("name", ">=", name)
      .orderBy("name", "asc")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   *
   * @param {string} name
   * @returns
   */
  findByEqualName: (name) => {
    return firebase
      .firestore()
      .collection("Neighborhoods")
      .where("name", "==", name)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   *
   * @param {string} docId
   * @returns Promise
   */
  findByDocId: (docId) => {
    return firebase
      .firestore()
      .collection("Neighborhoods")
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
  },
  /**
   *
   * @param {string} name
   * @returns
   */
  create: (name) => {
    return firebase.firestore().collection("Neighborhoods").add({
      name: name,
    });
  },
  /**
   *
   * @param {string} docId
   * @param {string} name
   * @returns
   */
  update: (docId, name) => {
    return firebase.firestore().collection("Neighborhoods").doc(docId).update({
      name: name,
    });
  },
  /**
   *
   * @param {string} id
   * @returns Promise
   */
  delete: (id) => {
    return firebase.firestore().collection("Neighborhoods").doc(id).delete();
  },
};

// function callApi({ method, url, params }) {
//   return new Promise((resolve, reject) => {
//     // XMLHttpRequest permite que façamos chamadas ao backend usando ajax
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url, true);

//     let token = window.localStorage.getItem("auth");
//     // Enviando o JWT do usuario logado no Cabeçalho
//     xhr.setRequestHeader('Authorization', token);
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

//     // Quando o estado de pronto da chamada modificar
//     xhr.onreadystatechange = function () {
//       // readyState igual a 4 significa que a chamada foi finalizada
//       if (this.readyState == 4) {
//         const json = JSON.parse(this.responseText);
//         if (this.status != 200) {
//           reject(json);
//         } else {
//           resolve(json);
//         }
//       }
//     };

//     console.log(JSON.stringify(params))
//     // Enviando a chamada para o backend
//     xhr.send(JSON.stringify(params));
//   });
// }
