var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../../index.html";
    }).catch((error) => {
        alert('Um Erro ocorreu ao fazer logout', error);
    })
}

/**
 * Função chamada ao clicar no botão 'Salvar', a mesma verifica
 * se já existe algum documento com o nome do Bairro informado.
 * Caso existe emite um Alert(), caso não então chama a função insertItem() 
 * para criar o documento.
 */
function save() {
    const docBairroRef = bairrosCollectionRef.doc(formBairro.inputBairroNome().value);

    docBairroRef.get().then((doc) => {
        if (doc.exists) {
            alert('Bairro já cadastrado! Por favor informe outro bairro.')
        } else {
            insertItem(formBairro.inputBairroNome().value);
        }
    }).catch((error) => {
        alert("Error ao consultar documento referente ao bairro:", error);
    });
}

/**
 * Função responsável por criar um Documento com o nome do bairro 
 * informado pelo usuário. Dentro do Documento criar um campo 'nomeBairro' com 
 * o nome do bairro.
 */
function insertItem(bairro) {
    bairrosCollectionRef.doc(bairro).set({
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