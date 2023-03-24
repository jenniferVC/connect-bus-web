var db = firebase.firestore();

var bairrosCollectionRef = db.collection("Bairros");

/**
 * Carrega os nomes dos bairros no campo Select.
 */
function loadNeighborhood() {
    const inputBairroPai = document.getElementById('options-nomes-bairros');
    inputBairroPai.innerHTML = '';

    // Itera sobre cada documento da collection "Bairros" e
    // coloca o valor do atributo "nomeBairro" dentro da tag "option"
    bairrosCollectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((docBairro) => {
            const option = document.createElement("option");
            option.innerHTML = docBairro.data().nomeBairro;
            inputBairroPai.appendChild(option);
        });
    }).catch(err => { alert(err) });
}

/**
 * Verifica se os campos Latitude e Longitude foram informados.
 * @returns 
 */
function onChangeBusStop() {
    const parada = {
        geopoint: new firebase.firestore.GeoPoint(formParada.inputLat().value, formParada.inputLgn().value),
    }

    if (parada.geopoint) {
        return parada;
    }
    else {
        return false;
    }
}


/**
 * Função chamada ao clicar no botão Salvar.
 */
function save() {
    var paradasCollectionRef = db.collection(`Bairros/${formParada.inputBairroNome().value}/Paradas`);
    const parada = onChangeBusStop();

    debugger

    if (parada) {

        // Fazendo referencia ao documento que tem o nome do bairro, o qual
        // foi selecionado no Select.
        // const bairroRef = bairrosCollectionRef.doc(formParada.inputBairroNome().value);

        paradasCollectionRef.add({
            // Adicionando a nova parada no array "paradas"
            geopoint: parada
        })
            .then(function () {
                alert("Parada cadastrada com sucesso!")
            })
            .catch(function (error) {
                alert(`Erro ao cadastrar parada\n${error}`)
            });
    }
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
const formParada = {
    inputBairroNome: () => document.getElementById("options-nomes-bairros"),
    inputLat: () => document.getElementById("input-lat"),
    inputLgn: () => document.getElementById("input-lgn"),
}