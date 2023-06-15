/**
 * Service de Bairro criado para manipular os acessos ao banco Firestore
 */
const neighborhoodService = {
  /**
   * Retorna todos os Bairros do banco
   * @returns Promise
   */
  getAll: () => {
    return new Promise(async (resolve, reject) => {
      // XMLHttpRequest permite que façamos chamadas ao backend usando ajax
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "http://localhost:3000/bairros",
        true
      );

      // Enviando o JWT do usuario logado
      // xhr.setRequestHeader('Authorization', await firebase.auth().currentUser.getIdToken())

      const token = getToken();
      console.log(token)

      // Quando o estado de pronto da chamada modificar
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status != 200) {
            reject(this.responseText);
          }
          console.log(this.responseText);
        }
        // if (this.readyState == 4) {
        //   const json = JSON.parse(this.responseText);
        //   if (this.status != 200) {
        //     reject(json);
        //   } else {
        //     resolve(json);
        //   }
        // }
      }

      // Enviando a chamada para o backend
      xhr.send();
    })
  },
  /**
   * 
   * @param {string} name 
   * @returns Promise
   */
  findByName: name => {
    return firebase.firestore()
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
  findByEqualName: name => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .where("name", "==", name)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs;
      });
  },
  /**
   * 
   * @param {string} id 
   * @returns Promise
   */
  findByID: id => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        }
      })
  },
  /**
   * 
   * @param {string} name 
   * @returns 
   */
  create: name => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .add({
        name: name
      })
  },
  /**
   * 
   * @param {string} id 
   * @param {string} name 
   * @returns 
   */
  update: (id, name) => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .update({
        name: name
      })
  },
  /**
   * 
   * @param {string} id 
   * @returns Promise
   */
  delete: id => {
    return firebase.firestore()
      .collection("Neighborhoods")
      .doc(id)
      .delete();
  },
}

function getToken() {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(token => {
        console.log(token);
        return token;
      });
    }
  });
}