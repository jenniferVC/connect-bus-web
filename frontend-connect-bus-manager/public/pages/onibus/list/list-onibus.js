const tbody = document.querySelector("tbody");
const paginationTotal = document.getElementById("pagination-total");

class Onibus {
  docId;
  codigo;
  linha;
  estadoFisico;
  latitude;
  longitude;
}


/**
 * Função chamada quando é informado um valor no campo de Busca
 */
function searchItem() {
  const onibusSearch = document.getElementById("search").value;
  console.log("Onibus pesquisado: ", onibusSearch);

  showLoading();
  onibusService
    .findByCode(onibusSearch)
    .then((onibus) => {
      hideLoading();
      loadItensInTable(onibus);
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documentos: " + error.message);
    });
}

/**
 * Função chamada ao clicar no icone de editar da tabela.
 * @param {Onibus} onibus
 */
function editItem(onibus) {
  window.location.href = "../create/create-onibus.html?docID=" + onibus.docId;
}

/**
 * Função chamada ao clicar no icone de excluir da tabela.
 * @param {Onibus} onibus
 */
function deleteItem(onibus) {
  showLoading();
  onibusService
    .delete(onibus.docId)
    .then(() => {
      hideLoading();
      alert("Onibus deletado com sucesso!");
      window.location.reload();
    })
    .catch((error) => {
      alert("Erro ao remover Onibus: " + error.message);
    });
}

/**
 * Função que irá exibir mensagem de 'Nenhum conteúdo para listar' ao fazer uma pesquisa.
 */
function itemNotFound() {
  tbody.innerHTML = "";
  let tr = document.createElement("tr");
  tr.innerHTML = `
        <td>Nenhum conteúdo para listar</td>
    `;
  tbody.appendChild(tr);
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Onibus[]} items
 */
function convertDocumentFirebaseToHTML(items) {
  console.log("convertendo em HTML" + items);
  items.forEach((onibus) => {
    // ------------ CÉLULA DO CODIGO -------------

    const td_bairro = generateElementTextTd(onibus.codigo);

    // ------------ CÉLULA DO ESTADO FISICO -------------

    const td_lat = generateElementTextTd(onibus.estadoFisico);

    // ------------ CÉLULA DA LINHA -------------

    const td_lgt = generateElementTextTd(onibus.linha);

    // ------------ CÉLULA DO BOTÃO EDITAR -------------

    const td_edit = generateButtonEdit(onibus);

    // ------------ CÉLULA DO BOTÃO EXCLUIR -------------

    const td_delete = generateButtonDelete(onibus);

    // Linha TR da tabela contendo todas as celulas
    let tr = document.createElement("tr");
    tr.appendChild(td_bairro);
    tr.appendChild(td_lat);
    tr.appendChild(td_lgt);
    tr.appendChild(td_edit);
    tr.appendChild(td_delete);

    // Acrescentando a linha ao corpo da tabela
    tbody.appendChild(tr);
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
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Parada[]} documents
 */
function loadItensInTable(documents) {
  console.log(documents);
  if (documents.length === 0) {
    itemNotFound();
  } else {
    tbody.innerHTML = "";
    paginationTotal.innerHTML = `${documents.length} items`;
    // const arrBairros = documents.map(document => convertDocumentFirebaseToObject(document));
    // console.log(arrBairros);
    // // TODO: Colocar loading
    console.log("convertendo documents em html");
    convertDocumentFirebaseToHTML(documents);
  }
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

  console.log(paradasRecuperadasDoBanco);
  paradasRecuperadasDoBanco.paradas.forEach((latlgn) => {
    console.log(latlgn);
    const parada = new Parada();
    parada.nomeBairro = doc.id;
    parada.latitude = latlgn._lat;
    parada.longitude = latlgn._long;

    arrayParadas.push(parada);
  });

  return arrayParadas;
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
  showLoading();
  onibusService
    .getAll()
    .then((documents) => {
      hideLoading();
      loadItensInTable(documents);
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documentos: " + error.message);
    });
}

getItensBD();
