var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");
const tbody = document.querySelector('tbody');

const paginationTotal = document.getElementById('pagination-total');

function editItem(bairro) {
    // Função para editar o item
    // console.log('editando item:' + bairro)
}

function deleteItem(bairro) {
    // console.log('deletando item:' + bairro)
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {string[]} arrBairros 
 */
function convertDocumentFirebaseToHTML(arrBairros) {
    arrBairros.forEach((bairro, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${bairro}</td>
            <td class="acao">
            <button onclick="editItem(${bairro.toString()})"><i class='bx bx-edit' ></i></button>
            </td>
            <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        `
        tbody.appendChild(tr)
    });
}

/**
 * Função que verifica se possui dados a serem listados.
 * @param {*} documents 
 */
function loadItensInTable(documents) {
    console.log(documents.length);
    if (documents.length === 0) {
        itemNotFound();
    }
    else {
        tbody.innerHTML = "";
        paginationTotal.innerHTML = `1-${documents.length} de ${documents.length}`;
        const arrBairros = documents.map(doc => doc.data().nomeBairro);
        console.log(arrBairros);
        // TODO: Colocar loading
        convertDocumentFirebaseToHTML(arrBairros);
    }
}

/**
 * Função que irá exibir mensagem de 'Nenhum conteúdo para listar'
 */
function itemNotFound() {
    tbody.innerHTML = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>Nenhum conteúdo para listar</td>
    `
    tbody.appendChild(tr)
}

/**
 * Função chamada quando é informado um valor no campo de Busca
 */
function searchItem() {
    const bairroSearch = document.getElementById('busca').value;
    console.log('Bairro pesquisado: ', bairroSearch);

    bairrosCollectionRef.where("nomeBairro", ">=", bairroSearch)
        .get()
        .then((querySnapshot) => {
            loadItensInTable(querySnapshot.docs);
        })
        .catch((error) => {
            alert("Erro ao obter documentos: ", error);
        });
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    bairrosCollectionRef.get().then((querySnapshot) => {
        loadItensInTable(querySnapshot.docs);
    }).catch((error) => {
        alert("Erro ao obter documentos: ", error);
    });
}

getItensBD();