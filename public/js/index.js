

/**
 * "onAuthStateChanged()" método que captura quando o Estado de Autenticação do usuário mudar.
 * Se o usuário estiver logado, então o redireciona para a página Dashboard.
 */
firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "pages/dashboard/dashboard.html";
  }
})

/**
 * Função chamada ao detectar alteração no campo email.
 */
function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

/**
 * Função chamada ao detectar alteração no campo senha.
 */
function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

/**
 * Método para habilitar e desabilitar mensagem de erro do campo email.
 */
function toggleEmailErrors() {
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";

  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

/**
 * Método para habilitar e desabilitar mensagem de erro do campo senha.
 */
function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

/**
 * Método para habilitar e desabilitar botão de "Recuperar Senha" e de "Entrar".
 */
function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  form.recoverPasswordButton().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

/**
 * Verifica se o email esta no formato correto.
 * @returns boolean
 */
function isEmailValid() {
  const email = form.email().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

/**
 * Verifica se campo "Senha" esta vazio.
 */
function isPasswordValid() {
  return form.password().value ? true : false;
}

/**
 * Função responsável por consultar Email e Senha do usuário no Firebase e
 * caso usuário esteja registrado o direciona para a página do Dashboard.
 */
function login() { 
  showLoading();
  firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
    hideLoading();
    window.location.href = "pages/dashboard/dashboard.html";
  }).catch(error => {
    hideLoading();
    alert(getErrorMessage(error));
  });
}

/**
 * Função chamado ao clicar no botão 'Recuperar Senha', a mesma envia
 * um email de recuperação de senha para o email do usuário que está cadastrado
 * no Firebase.
 */
function recoverPassword() {
  showLoading();
  firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
    hideLoading();
    alert('Email enviado com sucesso');
  }).catch(error => {
    hideLoading();
    alert(getErrorMessage(error));
  });
}

/**
 * Função responsável por deixar as mensagens de erro do Firebase
 * mais amigáveis para os usuários.
 * @param {*} error 
 * @returns error.message
 */
function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
    return "Usuário não encontrado";
  }
  if (error.code == "auth/wrong-password") {
    return "Senha inválida";
  }
  return error.message;
}

const form = {
  email: () => document.getElementById("email"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  passwordRequiredError: () => document.getElementById("password-required-error"),
  recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 

// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);