function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch((error) => {
        alert('Um Erro ocorreu ao fazer logout', error);
    })
}

/**
 * "onAuthStateChanged()" método que captura quando o Estado de Autenticação do usuário mudar.
 * Se o usuário estiver logado, então o redireciona para a página Dashboard.
 */
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(token => console.log(token));
    }
  })