var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");
let bairroExiste;


/**
 * Função responsável por verificar se existe documento com o nome
 * do bairro informado no campo Select
 */
function neighborhoodExist() {
    const docBairroRef = bairrosCollectionRef.doc(formBairro.inputBairroNome().value);

    docBairroRef.get().then((doc) => {
        if (doc.exists) {
            bairroExiste = true;
            alert('Bairro já cadastrado! Por favor informe outro bairro.')
        } else {
            bairroExiste = false;
        }
    }).catch((error) => {
        alert("Error ao consultar documento referente ao bairro:", error);
    });
}

function save() {
    neighborhoodExist();
    console.log(bairroExiste);

}

function insertItem(){
    if (!bairroExiste) {
        bairrosCollectionRef.doc(formBairro.inputBairroNome().value).set({
            nomeBairro: formBairro.inputBairroNome().value
        }).then((docRef) => {
            console.log("Document salvo ");
        }).catch((error) => {
            console.error("Error ao adicionar o documento: ", error);
        });
    }

    db.collection("Bairros").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    });
}


const formBairro = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
}