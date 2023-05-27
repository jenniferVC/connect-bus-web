var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");

class Bairro {
    id;
    nomeBairro;
}

/**
 * Função responsável por fazer o logout do usuário e redirecioná-lo para a pagina de login
 */
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../../index.html";
    }).catch((error) => {
        alert('Um Erro ocorreu ao fazer logout', error);
    })
}

// Verificando  se tem um paramentro na URL 
// caso tenha então o consulta no banco
if (existParams()) {
    const bairroID = getItemURL();
    findItemByID(bairroID);
}

/**
 * Função responsável por receber o parâmetro enviado pela URL 
 * no momento de Editar o item.
 * @returns string
 */
function getItemURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('Parametro enviado pela URL: ', urlParams.get('id'));
    return urlParams.get('id');
}

/**
 * Função responsável por consultar no banco através do ID do Document.
 * Caso encontre, então preenche os campos com a função fillFields(), 
 * caso contrário o usuário é redirecionado para a pagina da tabela bairros.
 * @param {string} id 
 */
function findItemByID(id) {
    showLoading();
    bairroService.findByID(id).then(bairro => {
        hideLoading();
        if (bairro) {
            console.log(bairro);
            fillFields(bairro);
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
 * @param {Bairro} bairro 
 */
function fillFields(bairro) {
    formBairro.inputBairroNome().value = bairro.nomeBairro;
}

/**
 * Função que verifica se existe parametro enviado pela URL
 * @returns boolean
 */
function existParams() {
    return getItemURL() ? true : false;
}

/**
 * Caso exista parametros na URL então significa que o item
 * esta sendo editado e precisa atualizá-lo no banco,
 * caso contrário é um novo cadastro e o insere no banco.
 */
function saveItem() {
    if (existParams()) {
        UPDATE();
    } else {
        INSERT(formBairro.inputBairroNome().value);
    }
}

/**
 * Função que verifica se já existe algum documento com o nome do Bairro informado.
 * Caso existe emite um Alert(), caso não então chama a função saveItem() 
 * para criar o documento.
 */
function verifyIfExists() {
    bairroService.findByEqualName(formBairro.inputBairroNome().value).then((documents) => {
        if (documents.length > 0) {
            alert('Bairro já cadastrado! Por favor informe outro bairro.')
        } else {
            saveItem();
        }
    })
        .catch((error) => {
            console.log("Erro ao obter documentos: ", error);
        });
}

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

/**
 * Função responsável por atualizar item no banco
 */
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


const formBairro = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
}