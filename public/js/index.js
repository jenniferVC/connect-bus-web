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
 * Função responsável por verificar no banco Firebase o login do usuário.
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