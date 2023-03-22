var db = firebase.firestore();

function save() {
    db.collection("Bairros").doc(formBairro.inputBairroNome().value).set({
        nomeBairro: formBairro.inputBairroNome().value
    }).then((docRef) => {
        console.log("Document salvo ");
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });

    db.collection("Bairros").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    });
}

const formBairro = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
}