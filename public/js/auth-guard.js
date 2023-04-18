/**
 * "onAuthStateChanged()" método que captura quando o Estado de Autenticação do usuário mudar.
 * Se o usuário não estiver logado, então o redireciona para a página de Login.
 */
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../../index.html";
    }
})