const tbody = document.querySelector("tbody");
const paginationTotal = document.getElementById("pagination-total");

class Parada {
  docId;
  bairro;
  latitude;
  longitude;
}

/**
 * Função chamada ao clicar no icone de editar da tabela.
 * @param {Parada} parada
 */
function editItem(parada) {
  window.location.href = "../create/create-paradas.html?docID=" + parada.docId;
}

/**
 * Função chamada ao clicar no icone de excluir da tabela.
 * @param {Parada} parada
 */
function deleteItem(parada) {
  // paradaService.delete(parada.docId).then(() => {
  //     alert("Bairro deletado com sucesso!");
  //     window.location.reload();
  // }).catch((error) => {
  //     alert("Erro ao remover bairro: " + error.message);
  // });
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
 * @param {Parada[]} arrParadas
 */
function convertDocumentFirebaseToHTML(arrParadas) {
  console.log("convertendo em HTML" + arrParadas);
  arrParadas.forEach((parada) => {
    // ------------ CÉLULA DO NOME DO BAIRRO -------------

    const td_bairro = generateElementTextTd(parada.bairro);

    // ------------ CÉLULA DA LATITUDE -------------

    const td_lat = generateElementTextTd(parada.latitude);

    // ------------ CÉLULA DA LONGITUDE -------------

    const td_lgt = generateElementTextTd(parada.longitude);

    // ------------ CÉLULA DO BOTÃO EDITAR -------------

    const td_edit = generateButtonEdit(parada);

    // ------------ CÉLULA DO BOTÃO EXCLUIR -------------

    const td_delete = generateButtonDelete(parada);

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
  // arrParadas.forEach((parada, index) => {
  //     let tr = document.createElement("tr");

  //     tr.innerHTML = `
  //         <td>${parada.nomeBairro}</td>
  //         <td>${parada.latitude}</td>
  //         <td>${parada.longitude}</td>
  //         <td class="acao">
  //         <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
  //         </td>
  //         <td class="acao">
  //         <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
  //         </td>
  //     `
  //     tbody.appendChild(tr)
  // });
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
 * Função chamada quando é informado um valor no campo de Busca
 */
function searchItem() {
  const latlongSearch = document.getElementById("busca").value;
  console.log("lat e long de busca: " + latlongSearch);
  const latlongWithoutComma = latlongSearch.split(",");
  console.log(
    "latitude e longitude quebrada pela virgula: " + latlongWithoutComma
  );
  const geopointSearch = new firebase.firestore.GeoPoint(
    latlongWithoutComma[0],
    latlongWithoutComma[1]
  );

  console.log("geopoint consulta: " + JSON.stringify(geopointSearch));

  paradasCollectionRef
    .where("paradas", "array-contains", geopointSearch)
    .get()
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
  showLoading();
  paradaService
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
