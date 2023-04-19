var db = firebase.firestore();
var paradasCollectionRef = db.collection("Paradas");

class Parada {
    nomeBairro;
    paradas = [];
};

function convertDocumentToParada(doc){
    const parada = new Parada();

    parada.nomeBairro = doc.id;
    parada.paradas = doc.data();

    return parada;
}


function getItensBD() {

    paradasCollectionRef.get().then((querySnapshot) => {
        console.log(querySnapshot.docs.map(doc => convertDocumentToParada(doc)))
    });
}

getItensBD();