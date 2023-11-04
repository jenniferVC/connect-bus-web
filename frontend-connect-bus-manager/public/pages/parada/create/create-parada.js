var db = firebase.firestore();

var bairrosCollectionRef = db.collection("Neighborhoods");

function loadNeighborhoodInSelect() {
    
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    // const inputBairroPai = document.getElementById('neighborhood-select');
    // inputBairroPai.innerHTML = '';

    // Itera sobre cada documento da collection "Bairros" e
    // coloca o valor do atributo "nomeBairro" dentro da tag "option"
    bairrosCollectionRef.get().then((querySnapshot) => {
        // querySnapshot.forEach((docBairro) => {
        //     // const option = document.createElement("option");

        //     // option.setAttribute("value", docBairro.data().nomeBairro);
        //     // option.innerHTML = docBairro.data().nomeBairro;
        //     // inputBairroPai.appendChild(option);

        //     concatOption += `
        //         <option value="${docBairro.data().nomeBairro}">${docBairro.data().nomeBairro}</option> 
        //     `
        // });
    }).catch(err => alert('Erro ao listar bairros' + err));

    console.log('Options concatenados: ', concatOption);
}

/**
 * Verifica se os campos Latitude e Longitude foram informados.
 * @returns 
 */
function onChangeBusStop() {
    console.log('longitude: ', formParada.inputLgn().value);
    if (formParada.inputLat().value && formParada.inputLgn().value) {
        console.log('tem os dois campos')
        return new firebase.firestore.GeoPoint(formParada.inputLat().value, formParada.inputLgn().value);
    }
    else {
        console.log('esta faltando campo')
        return false;
    }
}


/**
 * Função chamada ao clicar no botão Salvar.
 */
// Video que mostra como salvar um objeto no firestore
// https://www.youtube.com/watch?v=qaojB_xyZ4s&list=PLMbclvogjXZWgHgQcY5H4MvKtEW8q53cC&index=26
function save() {
    // TODO: chamar a função que mostrar o loading por uns segundos
    const parada = onChangeBusStop();

    if (parada) {

        // Fazendo referencia ao documento que tem o nome do bairro, o qual
        // foi selecionado no Select.
        const docBairroRef = bairrosCollectionRef.doc(formParada.selectNeighbourhood().value);

        docBairroRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Documento existe! Dados do documento:", doc.data());
            } else {
                // doc.data() pode ser indefinido no caso
                alert("Não encontrou o documento!");
            }
        }).catch((error) => {
            alert("Error ao consultar documento:" + error);
        });



        // paradasCollectionRef.add({
        //     // Adicionando a nova parada no array "paradas"
        //     geopoint: parada
        // })
        //     .then(function () {
        //         alert("Parada cadastrada com sucesso!")
        //     })
        //     .catch(function (error) {
        //         alert(`Erro ao cadastrar parada\n${error}`)
        //     });
    }
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
const formParada = {
    selectNeighborhood: () => document.getElementById("neighborhood-select"),
    inputLat: () => document.getElementById("input-lat"),
    inputLgn: () => document.getElementById("input-lgn"),
}