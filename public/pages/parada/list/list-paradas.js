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


function getItensBD() {
    paradasCollectionRef.get().then((querySnapshot) => {
        console.log(querySnapshot.docs.map(doc => convertDocumentFirebaseToObject(doc)));
        const paradasNormalizadas = querySnapshot.docs.map(doc => convertDocumentFirebaseToObject(doc));
        console.log('paradasNormalizadas = ', paradasNormalizadas)

        // Normalizando o array com a função 'flat()'
        const arrayParadasFlat = paradasNormalizadas.flat();
        console.log(arrayParadasFlat);
        loadItensInTable(arrayParadasFlat);
    });
}

getItensBD();