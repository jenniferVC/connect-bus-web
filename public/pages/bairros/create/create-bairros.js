var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../../index.html";
    }).catch((error) => {
        alert('Um Erro ocorreu ao fazer logout', error);
    })
}

// Verificando  se tem um paramentro na URL 
// caso tenha então o consulta no banco
if (itemParam()) {
    const nomeBairro = getItemURL();
    findItemByNomeBairro(nomeBairro);
}

/**
 * Função responsável por consultar no banco através do campo 'nomeBairro'.
 * Caso não encontre então o usuário é redirecionado para a pagina da tabela bairros.
 * @param {string} nomeBairro 
 */
function findItemByNomeBairro(nomeBairro) {
    showLoading();
    bairrosCollectionRef.doc(nomeBairro).get().then(doc => {
        hideLoading();
        if (doc.exists) {
            console.log(doc.data());
            fillFields(doc.data());
        }
        else {
            alert("Documento não encontrado");
            window.location.href = "../list/list-bairros.html";
        }
    }).catch(error => {
        hideLoading();
        alert('Erro ao obter documento: ', error);
    })
}

/**
 * Função responsável por preencher todos os campos da pagina.
 * @param {*} bairro 
 */
function fillFields(bairro) {
    formBairro.inputBairroNome().value = bairro.nomeBairro;
}

/**
 * Função responsável por receber o parâmetro enviado pela URL 
 * no momento de Editar o item.
 * @returns string
 */
function getItemURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Parametro enviado pela URL: ', urlParams.get('nomeBairro'));
    return urlParams.get('nomeBairro');
}

/**
 * Função que verifica se o item já existe e esta sendo editado ou 
 * se esta sendo criado do zero.
 * @returns boolean
 */
function itemParam() {
    return getItemURL() ? true : false;
}

function saveItem() {
    if (!itemParam()) {
        INSERT(formBairro.inputBairroNome().value);
    } else {
        UPDATE();
    }
}

function UPDATE() {
    showLoading();

    bairrosCollectionRef.doc(getItemURL()).update({
        nomeBairro: formBairro.inputBairroNome().value
    }).then(() => {
        hideLoading();
        alert("Bairro atualizado com sucesso!");
    })
        .catch((error) => {
            hideLoading();
            // The document probably doesn't exist.
            console.error("Erro ao atualizar Bairro ", error);
        });
}

function verifyIfExists() {
    bairrosCollectionRef.where("nomeBairro", "==", formBairro.inputBairroNome().value).get().then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
            alert('Bairro já cadastrado! Por favor informe outro bairro.')
        } else {
            console.log('chamar funcao que varifica se é ediçao ou cadastro de bairro...')
            saveItem();
        }
    })
        .catch((error) => {
            console.log("Erro ao obter documentos: ", error);
        });
}

/**
 * Função que verifica se já existe algum documento com o nome do Bairro informado.
 * Caso existe emite um Alert(), caso não então chama a função INSERT() 
 * para criar o documento.
 */
// function create() {
//     const docBairroRef = bairrosCollectionRef.doc(formBairro.inputBairroNome().value);

//     docBairroRef.get().then((doc) => {

//     }).catch((error) => {
//         alert("Error ao consultar documento referente ao bairro:", error);
//     });
// }

/**
 * Função responsável por criar um Documento com o nome do bairro 
 * informado pelo usuário. Dentro do Documento criar um campo 'nomeBairro' com 
 * o nome do bairro.
 */
function INSERT(bairro) {
    bairrosCollectionRef.add({
        nomeBairro: bairro
    }).then((docRef) => {
        alert("Bairro cadastrado com sucesso!");
    }).catch((error) => {
        alert("Error ao cadastrar bairro: ", error);
    });

    // DEBUG: Listando os dados da Coleção Bairros
    db.collection("Bairros").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    });
}


const formBairro = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
}