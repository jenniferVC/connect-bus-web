var db = firebase.firestore();

var BairrosCollection = db.collection("Bairros");
var ParadasCollection = db.collection("Paradas");
var HorarioCollection = db.collection("Horario");

function selectNeighborhoods() {
    const bairros = [];
    const newHTML = '';
    const inputBairroPai = document.getElementById('input-bairro-nome');
    const optionBairroFilho = document.createElement('option');

    BairrosCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((docBairro) => {
            bairros.push(docBairro.data().nome);
        });
    });

    bairros.forEach((nome) => {
        newHTML += `<option>${nome}</option>`;
    })

    console.log(newHTML);
    inputBairroPai.innerHTML = newHTML;

}

function save() {
    const insert = {
        nomeBairro: form.inputBairroNome().value,
        parada: '',
        horario: '',
    }
    const parada = onChangeBusStop();
    const horario = onChangeTime();

    if (parada && horario) {
        insert.parada = parada;
        insert.horario = horario;
        console.log(insert);
    }
    else if (parada) {
        insert.parada = parada;
        console.log(insert);
    }
    else if (horario) {
        insert.horario = horario;
        console.log(insert);
    }

    BairrosCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().nome);
        });
    });

    // BairrosCollection.add({ "nome": insert.nomeBairro })
    //     .then(function () {
    //         console.log("Document successfully written!");
    //     })
    //     .catch(function (error) {
    //         console.error("Error writing document: ", error);
    //     });
}

function onChangeBusStop() {
    const parada = {
        id: parseInt(form.inputParadaID().value),
        nome: form.inputPontoNome().value,
        latlgn: form.inputLatLgn().value,
    }

    if (parada.id && parada.nome && parada.latlgn) {
        return parada;
    }
    else {
        return false;
    }
}

function onChangeTime() {
    const horario = {
        tipoLinha: form.inputTipoLinha().value,
        hora: form.inputHora().value,
    }

    if (horario.hora && horario.tipoLinha) {
        return horario;
    }
    else {
        return false;
    }
}

const form = {
    inputBairroNome: () => document.getElementById("input-bairro-nome"),
    inputPontoNome: () => document.getElementById("input-ponto-nome"),
    inputParadaID: () => document.getElementById("input-parada-id"),
    inputLatLgn: () => document.getElementById("input-lat-lgn"),
    inputHora: () => document.getElementById("input-hora"),
    inputTipoLinha: () => document.getElementById("input-line-type"),
}

