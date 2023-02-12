var db = firebase.firestore();

function save() {
    console.log(form.inputBairroNome());
    // var inputBairroNome = document.getElementById("input-bairro-nome").value;
    // var inputPontoNome = document.getElementById("input-ponto-nome").value;
    // var inputParada = document.getElementById("input-parada-id").value;
    // var inputLatLgn = document.getElementById("input-lat-lgn").value;
    // var inputHora = document.getElementById("input-hora").value;
    // var inputTipoLinha = document.getElementById("input-line-type").value;

    // db.collection("Paradas").doc(inputPontoNome).set({
    //     id: inputParada,
    //     latlgn: inputLatLgn
    // })
    //     .then(function () {
    //         console.log("Doc successful");
    //     })
    //     .catch(function (error) {
    //         console.error("Error writing doc", error);
    //     });
}

const form = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
    inputPontoNome: () => document.getElementById("input-ponto-nome"),
    inputParada: () => document.getElementById("input-parada-id"),
    inputLatLgn: () => document.getElementById("input-lat-lgn"),
    inputHora: () => document.getElementById("input-hora"),
    inputTipoLinha: () => document.getElementById("input-line-type"),
}

