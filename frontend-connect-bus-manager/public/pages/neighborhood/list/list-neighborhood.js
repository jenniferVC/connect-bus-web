const tbody = document.querySelector('tbody');
const paginationTotal = document.getElementById('pagination-total');

class Neighborhood {
    docId;
    name;
}

/**
 * Função chamada ao clicar no icone de editar da tabela.
 * @param {Neighborhood} neighborhood 
 */
function editItem(neighborhood) {
    window.location.href = "../create/create-neighborhood.html?docID=" + neighborhood.docId;
}

/**
 * Função chamada ao clicar no icone de excluir da tabela.
 * @param {Neighborhood} neighborhood 
 */
function deleteItem(neighborhood) {
    neighborhoodService.delete(neighborhood.docId).then(() => {
        alert("Bairro deletado com sucesso!");
        window.location.reload();
    }).catch((error) => {
        alert("Erro ao remover bairro: " + error.message);
    });
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Neighborhood[]} arrNeighborhoods 
 */
function convertDocumentFirebaseToHTML(arrNeighborhoods) {
    arrNeighborhoods.forEach((neighborhood) => {
        // ------------ CÉLULA DO NOME DO BAIRRO -------------

        const td_name = generateElementTextTd(neighborhood.nome);

        // ------------ CÉLULA DO BOTÃO EDITAR -------------

        const td_edit = generateButtonEdit(neighborhood);

        // ------------ CÉLULA DO BOTÃO EXCLUIR -------------

        const td_delete = generateButtonDelete(neighborhood);

        // Linha TR da tabela contendo todas as celulas
        let tr = document.createElement("tr");
        tr.appendChild(td_name)
        tr.appendChild(td_edit)
        tr.appendChild(td_delete)

        // Acrescentando a linha ao corpo da tabela
        tbody.appendChild(tr)
    });
}

/**
 * Função responsável por criar célula TR de texto 
 * @param {string} text 
 * @returns HTMLTableCellElement
 */
function generateElementTextTd(text) {
    let td = document.createElement("td");
    td.innerHTML = text;
    return td;
}

/**
 * Função responsável por criar célula TR contendo botão de editar. 
 * @param {*} item 
 * @returns HTMLTableCellElement
 */
function generateButtonEdit(item) {
    // Icone de editar
    let icon_edit = document.createElement("i");
    icon_edit.classList.add("bx", "bx-edit");

    // Botao contendo icone de editar
    let button_edit = document.createElement("button");
    button_edit.appendChild(icon_edit);
    button_edit.addEventListener("click", () => editItem(item));

    // Celula TD da tabela contendo o botao de editar
    let td_edit = document.createElement("td");
    td_edit.classList.add("acao");
    td_edit.appendChild(button_edit);

    return td_edit;
}

/**
 * Função responsável por criar célula TR contendo botão de excluir. 
 * @param {*} item 
 * @returns HTMLTableCellElement
 */
function generateButtonDelete(item) {
    // Icone de excluir
    let icon_delete = document.createElement("i");
    icon_delete.classList.add("bx", "bx-trash");

    // Botao contendo icone de excluir
    let button_delete = document.createElement("button");
    button_delete.appendChild(icon_delete);
    button_delete.addEventListener("click", () => deleteItem(item));

    // Celula TD da tabela contendo o botao de excluir
    let td_delete = document.createElement("td");
    td_delete.classList.add("acao");
    td_delete.appendChild(button_delete);
    
    return td_delete;
}

/**
 * Função que verifica se possui dados a serem listados.
 * @param {*} documents 
 */
function loadItensInTable(documents) {
    if (documents.length === 0) {
        itemNotFound();
    }
    else {
        tbody.innerHTML = "";
        paginationTotal.innerHTML = `${documents.length} items`;
        // const arrBairros = documents.map(document => convertDocumentFirebaseToObject(document));
        // console.log(arrBairros);
        // // TODO: Colocar loading
        console.log('convertendo documents em html')
        convertDocumentFirebaseToHTML(documents);
    }
}

/**
 * Converte documento do Firebase no Objeto Bairro
 * @param {*} document 
 * @returns Neighborhood
 */
function convertDocumentFirebaseToObject(document) {
    const neighborhood = new Neighborhood();
    neighborhood.docId = document.id;
    neighborhood.name = document.data().nome;
    return neighborhood;
}

/**
 * Função que irá exibir mensagem de 'Nenhum conteúdo para listar' ao fazer uma pesquisa.
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
    const neighborhoodSearch = document.getElementById('search').value;
    console.log('Bairro pesquisado: ', neighborhoodSearch);

    showLoading();
    neighborhoodService.findByName(neighborhoodSearch).then((neighborhoods) => {
        hideLoading();
        loadItensInTable(neighborhoods);
    })
        .catch((error) => {
            hideLoading();
            alert("Erro ao obter documentos: " + error.message);
        });
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    showLoading();
    neighborhoodService.getAll().then((documents) => {
        hideLoading();
        loadItensInTable(documents);
    }).catch((error) => {
        hideLoading();
        alert("Erro ao obter documentos: " + error.message);
    });
}

getItensBD();