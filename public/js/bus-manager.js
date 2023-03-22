var db = firebase.firestore();

var BairrosCollection = db.collection("Bairros");

/**
 * Carrega os nomes dos bairros no campo Select.
 */
function selectNeighborhoods() {
    let newHTML = '';
    const inputBairroPai = document.getElementById('options-nomes-bairros');
    inputBairroPai.innerHTML = '';

    BairrosCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((docBairro) => {
            const option = document.createElement("option");
            option.innerHTML = docBairro.data().nomeBairro;

            inputBairroPai.appendChild(option);

            docBairro.data().linhaazul.get().then((res) => {
                console.log(res.collection('Horarios').get())
            }).catch(err => { console.error(err) });
        });
    }).catch(err => { console.error(err) });
}

/**
 * Função chamada ao clicar no botão Salvar.
 */
// function save() {
//     const insertObjectComplete = {
//         nomeBairro: form.inputBairroNome().value,
//         paradas: [],
//         horarios: [],
//     }
//     const parada = onChangeBusStop();
//     const horario = onChangeTime();

//     if (parada && horario) {
//         insertObjectComplete.paradas.push(parada);
//         insertObjectComplete.horarios.push(horario);
//         console.log(insertObjectComplete);
//     }
//     else if (parada) {
//         // insertObjectComplete.paradas.push(parada);

//         // Fazendo referencia ao documento que tem o nome do bairro, o qual
//         // foi selecionado no Select.
//         const bairroRef = BairrosCollection.doc(form.inputBairroNome().value);
//         bairroRef.update({
//             // Adicionando uma nova parada no array "paradas"
//             paradas: firebase.firestore.FieldValue.arrayUnion(parada)
//         })
//             .then(function () {
//                 console.log("Parada successfully written!");
//             })
//             .catch(function (error) {
//                 console.error("Error writing document: ", error);
//             });
//     }
//     else if (horario) {
//         insertObjectComplete.horarios.push(horario);
//         console.log(insertObjectComplete);
//     }

//     BairrosCollection.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//         });
//     });


//     // BairrosCollection.doc(insertObjectComplete.nomeBairro).set(insertObjectComplete)
//     //     .then(function () {
//     //         console.log("Parada successfully written!");
//     //     })
//     //     .catch(function (error) {
//     //         console.error("Error writing document: ", error);
//     //     });
// }

function onChangeBusStop() {
    const parada = {
        id: parseInt(form.inputParadaID().value),
        geopoint: new firebase.firestore.GeoPoint(form.inputLat().value, form.inputLgn().value),
    }

    if (parada.id && parada.geopoint) {
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
    inputBairroNome: () => document.getElementById("options-nomes-bairros"),
    inputParadaID: () => document.getElementById("input-parada-id"),
    inputLat: () => document.getElementById("input-lat"),
    inputLgn: () => document.getElementById("input-lgn"),
    inputHora: () => document.getElementById("input-hora"),
    inputTipoLinha: () => document.getElementById("input-line-type"),
}

