var db = firebase.firestore();

var horariosCollectionRef = db.collection("Horarios");

class Horario {
    bairros;
    tipoLinha;
    diasDeFuncionamento;
}

function loadItens() {
    const horario = new Horario();

    horariosCollectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            horario.tipoLinha = doc.id;
            horario.diasDeFuncionamento = doc.data().diaDeFuncionamento;
            horario.bairros = doc.data().bairrosAtendidos;
        
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            /// PAREI AQUI
            console.log(horario.bairros)
        });
    });

    // itens = getItensBD()
    // tbody.innerHTML = ''
    // itens.forEach((item, index) => {
    //     insertItem(item, index)
    // })

}

loadItens();