function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch((error) => {
        alert('Um Erro ocorreu ao fazer logout', error);
    })
}