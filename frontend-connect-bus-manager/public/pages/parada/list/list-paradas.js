var db = firebase.firestore();
var paradasCollectionRef = db.collection("Paradas");

const tbody = document.querySelector('tbody');

class Parada {
    nomeBairro;
    latitude;
    longitude;
};

function editItem(index) {
    // Função para editar o item
    console.log('editando item:' + index)
}

function deleteItem(index) {
    console.log('deletando item:' + index)
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Parada[]} arrParadas 
 */
function loadItensInTable(arrParadas) {
    arrParadas.forEach((parada, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${parada.nomeBairro}</td>
            <td>${parada.latitude}</td>
            <td>${parada.longitude}</td>
            <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
            </td>
            <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        `
        tbody.appendChild(tr)
    });
}

/**
 * Convertendo o Document recebido do Firebase no objeto
 * Parada para ficar mais fácil a manipulação. 
 * Após transformar em objeto a parada é adicionado em um array
 * @param {*} doc 
 * @returns 
 */
function convertDocumentFirebaseToObject(doc) {
    const paradasRecuperadasDoBanco = doc.data();
    const arrayParadas = [];

    console.log(paradasRecuperadasDoBanco)
    paradasRecuperadasDoBanco.paradas.forEach(latlgn => {
        console.log(latlgn)
        const parada = new Parada();
        parada.nomeBairro = doc.id;
        parada.latitude = latlgn._lat;
        parada.longitude = latlgn._long;

        arrayParadas.push(parada)
    })

    return arrayParadas;
}

/**
 * Função chamada quando é informado um valor no campo de Busca
 */
function searchItem() {
    const latlongSearch = document.getElementById('busca').value;
    console.log('lat e long de busca: ' + latlongSearch);
    const latlongWithoutComma = latlongSearch.split(',');
    console.log('latitude e longitude quebrada pela virgula: '+   latlongWithoutComma)
    const geopointSearch = new firebase.firestore.GeoPoint(latlongWithoutComma[0], latlongWithoutComma[1])

    console.log('geopoint consulta: '+JSON.stringify(geopointSearch));

    paradasCollectionRef.where("paradas", "array-contains", geopointSearch).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Erro ao obter documentos: " + error);
        });


}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    // Recuperandos todos os documentos da Collection 'Paradas'
    // https://firebase.google.com/docs/firestore/query-data/get-data?hl=pt-br#get_multiple_documents_from_a_collection
    paradasCollectionRef.get().then((querySnapshot) => {
        console.log('Obtendo todos os documentos da coleção: ' + querySnapshot.docs.map(doc => convertDocumentFirebaseToObject(doc)));
        const paradasNormalizadas = querySnapshot.docs.map(doc => convertDocumentFirebaseToObject(doc));
        console.log('Documentos transformados no Objeto Parada = ', paradasNormalizadas)

        // Normalizando o array com a função 'flat()'
        const arrayParadasFlat = paradasNormalizadas.flat();
        console.log(arrayParadasFlat);
        loadItensInTable(arrayParadasFlat);
    })
        .catch((error) => {
            alert("Erro ao obter documentos: " + error);
        });
}

getItensBD();