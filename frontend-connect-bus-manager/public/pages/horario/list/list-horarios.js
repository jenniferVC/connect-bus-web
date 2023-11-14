const tbody = document.querySelector("tbody");
const paginationTotal = document.getElementById("pagination-total");

let documentosHorarios = [];

/**
 * Classe Horario para auxiliar na tipagem
 */
class Horario {
  docId;
  bairros = [];
  linha;
  diaDeFuncionamento;
}

/**
 * Função que converte cada item do banco para um item HTML da tabela
 * @param {Horario} horario
 * @param {number} index
 */
function convertBairroToTR(horario, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
        <td>${horario.bairros}</td>
        <td>${horario.linha}</td>
        <td>${horario.diasDeFuncionamento}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function documentsToHorario(doc) {
  let bairrosBanco = [];
  let horario = new Horario();

  console.log(doc.data().bairrosAtendidos);

  horario.linha = doc.id;
  horario.diasDeFuncionamento = doc.data().diaDeFuncionamento;
  bairrosBanco = Object.entries(doc.data().bairrosAtendidos);

  bairrosBanco.forEach((bairroAtendido) => {
    horario.bairros = bairroAtendido[1].bairros;
    documentosHorarios.push(horario);
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
 * Função chamada ao clicar no icone de editar da tabela.
 * @param {Horario} horario
 */
function editItem(horario) {
  window.location.href = "../create/create-horario.html?docID=" + horario.docId;
}

/**
 *Função que converte cada item do banco para um item HTML da tabela
 * @param {Horario[]} arrHorarios
 */
function convertDocumentFirebaseToHTML(arrHorarios) {
  arrHorarios.forEach((horario) => {
    // ------------ CÉLULA DOS BAIRROS -------------

    const td_bairros = generateElementTextTd(horario.bairros);

    // ------------ CÉLULA DA LINHA -------------

    const td_linha = generateElementTextTd(horario.linha);

    // ------------ CÉLULA DO DIA DE FUNCIONAMENTO -------------

    const td_dia = generateElementTextTd(horario.diaDeFuncionamento);

    // ------------ CÉLULA DO BOTÃO EDITAR -------------

    const td_edit = generateButtonEdit(horario);

    // ------------ CÉLULA DO BOTÃO EXCLUIR -------------

    const td_delete = generateButtonDelete(horario);

    // Linha TR(Table Row) da tabela contendo todas as celulas
    let tr = document.createElement("tr");
    tr.appendChild(td_bairros);
    tr.appendChild(td_linha);
    tr.appendChild(td_dia);
    tr.appendChild(td_edit);
    tr.appendChild(td_delete);

    // Acrescentando a linha ao corpo da tabela
    tbody.appendChild(tr);
  });
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
 * Função chamada ao clicar no icone de excluir da tabela.
 * @param {Horario} horario
 */
function deleteItem(horario) {
  horarioService.delete(horario.docId).then(() => {
      alert("Horario deletado com sucesso!");
      window.location.reload();
  }).catch((error) => {
      alert("Erro ao remover horario: " + error.message);
  });
}

/**
 * Função que verifica se possui dados a serem listados.
 * @param {*} documents
 */
function loadItensInTable(documents) {
  if (documents.length === 0) {
    itemNotFound();
  } else {
    tbody.innerHTML = "";
    paginationTotal.innerHTML = `${documents.length} items`;

    // // TODO: Colocar loading
    console.log("convertendo documents em html");
    convertDocumentFirebaseToHTML(documents);
  }
}

/**
 * Função chamada quando é informado um valor no campo de Busca
 */
function searchItem() {
  const horarioSearch = document.getElementById("search").value;
  console.log("Linha pesquisada: ", horarioSearch);

  showLoading();
  horarioService
    .findByLinha(horarioSearch)
    .then((horarios) => {
      hideLoading();
      loadItensInTable(horarios);
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
  horarioService
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
