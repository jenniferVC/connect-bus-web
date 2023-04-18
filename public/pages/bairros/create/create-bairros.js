var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");

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
            insertItem();
        }
    }).catch((error) => {
        alert("Error ao consultar documento referente ao bairro:", error);
    });
}

/**
 * Função responsável por criar um documento com o nome do bairro 
 * informado dentro do documento criar um campo 'nomeBairro' com 
 * o nome do bairro.
 */
function insertItem() {
    bairrosCollectionRef.doc(formBairro.inputBairroNome().value).set({
        nomeBairro: formBairro.inputBairroNome().value
    }).then((docRef) => {
        alert("Bairro cadastrado com sucesso!");
    }).catch((error) => {
        alert("Error ao cadastrar bairro: ", error);
    });

    // Listando os dados da Coleção Bairros como DEBUG
    db.collection("Bairros").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    });
}


const formBairro = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
}