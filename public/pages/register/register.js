/**
 * Função chamada no momento que o usuário digitar no campo Email,
 * validando se o email esta no formato correto ou se esta vazio.
 */
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

/**
 * Função chamada no momento que o usuário digitar no
 * campo Senha, verificando se a senha possui o tamanho
 * mínimo ou se esta vazia.
 */
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

/**
 * Função chamada no momento que o usuário digitar no campo Confirmar Senha.
 */
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

/**
 * Função que verifica se campos 'Senha' e 'Confirma Senha' são iguais.
 */
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

/**
 * Função que desabilita e habilita o botão 'Registrar' se campos do formulário foram validados ou não.
 */
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

/**
 * Função responsável por validar os campos Email, Senha e Confirmar Senha.
 * @returns boolean
 */
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

/**
 * Função chamada ao clicar no botão 'Registrar'. Captura os valores informados 
 * no campo Email e Senha e registra no Firebase.
 */
function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "pages/bus-manager.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}

/**
 * Função responsável por deixar as mensagens de erro do Firebase
 * mais amigáveis para os usuários.
 * @param {*} error 
 * @returns error.message
 */
function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    return error.message;
}

const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}