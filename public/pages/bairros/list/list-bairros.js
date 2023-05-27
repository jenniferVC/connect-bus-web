const tbody = document.querySelector('tbody');
const paginationTotal = document.getElementById('pagination-total');

class Bairro {
    id;
    nomeBairro;
}

/**
 * Função chamada ao clicar no icone de editar da tabela.
 * @param {Bairro} bairro 
 */
function editItem(bairro) {
    window.location.href = "../create/create-bairros.html?id=" + bairro.id;
}

/**
 * Função chamada ao clicar no icone de excluir da tabela.
 * @param {Bairro} bairro 
 */
function deleteItem(bairro) {
    bairroService.delete(bairro).then(() => {
        alert("Bairro deletado com sucesso!");
        window.location.reload();
    }).catch((error) => {
        alert("Erro ao remover bairro: ", error);
    });
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Bairro[]} arrBairros 
 */
function convertDocumentFirebaseToHTML(arrBairros) {
    console.log('entrou na funcao convertHTML')
    arrBairros.forEach((bairro, index) => {
        // ------------ CÉLULA DO NOME DO BAIRRO -------------

        let td_bairro = document.createElement("td");
        td_bairro.innerHTML = bairro.nomeBairro;

        // ------------ CÉLULA DO BOTÃO EDITAR -------------

        // Icone de editar
        let icon_edit = document.createElement("i");
        icon_edit.classList.add("bx", "bx-edit");

        // Botao contendo icone de editar
        let button_edit = document.createElement("button");
        button_edit.appendChild(icon_edit);
        button_edit.addEventListener("click", () => editItem(bairro));

        // Celula TD da tabela contendo o botao de editar
        let td_edit = document.createElement("td");
        td_edit.classList.add("acao");
        td_edit.appendChild(button_edit);

        // ------------ CÉLULA DO BOTÃO EXCLUIR -------------

        // Icone de excluir
        let icon_delete = document.createElement("i");
        icon_delete.classList.add("bx", "bx-trash");

        // Botao contendo icone de excluir
        let button_delete = document.createElement("button");
        button_delete.appendChild(icon_delete);
        button_delete.addEventListener("click", () => deleteItem(bairro));

        // Celula TD da tabela contendo o botao de excluir
        let td_delete = document.createElement("td");
        td_delete.classList.add("acao");
        td_delete.appendChild(button_delete);

        // Linha TR da tabela contendo todas as celulas
        let tr = document.createElement("tr");
        tr.appendChild(td_bairro)
        tr.appendChild(td_edit)
        tr.appendChild(td_delete)

        // Acrescentando a linha ao corpo da tabela
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
        const arrBairros = documents.map(document => convertDocumentFirebaseToObject(document));
        console.log(arrBairros);
        // TODO: Colocar loading
        console.log('convertendo documents em html')
        convertDocumentFirebaseToHTML(arrBairros);
    }
}

/**
 * Converte documento do Firebase no Objeto Bairro
 * @param {*} document 
 * @returns Bairro
 */
function convertDocumentFirebaseToObject(document) {
    const bairro = new Bairro();
    bairro.id = document.id;
    bairro.nomeBairro = document.data().nomeBairro;
    return bairro;
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

    showLoading();
    bairroService.findByName(bairroSearch).then((bairros) => {
        hideLoading();
        loadItensInTable(bairros);
    })
        .catch((error) => {
            hideLoading();
            alert("Erro ao obter documentos: ", error);
        });
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    showLoading();
    bairroService.getAll().then((documents) => {
        hideLoading();
        loadItensInTable(documents);
    }).catch((error) => {
        hideLoading();
        alert("Erro ao obter documentos: ", error);
    });
}

getItensBD();