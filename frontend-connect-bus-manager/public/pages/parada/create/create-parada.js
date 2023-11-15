
class Parada {
  docId;
  bairro;
  latitude;
  longitude;
}

// Verificando  se tem um paramentro na URL
// caso tenha então o consulta no banco
if (existParams()) {
  const docID = getItemURL();
  findItemByID(docID);
} else {
  getBairros();
}

/**
 * Função responsável por receber o parâmetro enviado pela URL
 * no momento de Editar o item.
 * @returns string
 */
function getItemURL() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log("Parametro enviado pela URL: ", urlParams.get("docID"));
  return urlParams.get("docID");
}

/**
 * Função responsável por consultar no banco através do ID do Document.
 * Caso encontre, então preenche os campos com a função fillFields(),
 * caso contrário o usuário é redirecionado para a pagina da tabela bairros.
 * @param {string} docID
 */
function findItemByID(docID) {
  showLoading();
  paradaService
    .findByDocID(docID)
    .then((parada) => {
      hideLoading();
      if (parada) {
        console.log(parada);
        fillFields(parada);
      } else {
        alert("Documento não encontrado");
        window.location.href = "../list/list-paradas.html";
      }
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documento: " + error);
    });
}

/**
 * Função responsável por preencher todos os campos da pagina.
 * @param {Parada} parada
 */
function fillFields(parada) {
  getBairros(parada.bairro);
  formParada.inputLat().value = parada.latitude;
  formParada.inputLgn().value = parada.longitude;
}

/**
 * Obtendo os bairros do banco e gerando as options
 * @param {string} bairroEdit
 * @returns string
 */
function getBairros(bairroEdit) {
  let count = 0;
  let concat = "";

  // Itera sobre cada documento da collection "Bairros" e
  // coloca o valor do atributo "nome" dentro da tag "option"
  neighborhoodService
    .getAll()
    .then((bairros) => {
      console.log(bairros);
      bairros.forEach((bairro) => {
        count = count + 1;
        if (bairroEdit === bairro.nome) {
          concat += `
              <option value="${count}" selected>${bairro.nome}</option>
              `;
        } else {
          concat += `
              <option value="${count}">${bairro.nome}</option>
              `;
        }
      });
      console.log(concat);
      loadNeighborhood(concat);
    })
    .catch((error) => {
      alert("Erro ao obter documentos: " + error);
    });
}

/**
 * Carrega os bairros no campo Select.
 * @param {string} bairros
 */
function loadNeighborhood(bairros) {
  const label = document.getElementById("select-bairros");
  const select = document.createElement("select");

  select.setAttribute("name", "bairros");
  select.setAttribute("id", "bairros");
  select.innerHTML = bairros;

  label.appendChild(select);
}

/**
 * Verifica se os campos Latitude e Longitude foram informados.
 * @returns
 */
function createParada() {
  let selectBairro = document.getElementById("bairros");
  const parada = new Parada();
  parada.docId = getItemURL();
  parada.bairro = selectBairro.options[selectBairro.selectedIndex].innerHTML;
  parada.latitude = formParada.inputLat().value;
  parada.longitude = formParada.inputLgn().value;
  return parada;
}

/**
 * Função que verifica se existe parametro enviado pela URL
 * @returns boolean
 */
function existParams() {
  return getItemURL() ? true : false;
}

function saveItem() {
  const parada = createParada();
  console.log(parada);
  if (existParams()) {
    UPDATE(parada);
  } else {
    INSERT(parada);
  }
}

/**
 * Função responsável por atualizar item no banco
 * @param {Parada} parada
 */
function UPDATE(parada) {
  showLoading();
  console.log(parada);
  paradaService
    .update(parada)
    .then(() => {
      hideLoading();
      alert("Parada atualizada com sucesso!");
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao atualizar Parada: " + error);
    });
}

/**
 * Função responsável por criar um Documento.
 * @param {Parada} parada
 */
function INSERT(parada) {
  paradaService
    .create(parada)
    .then(() => {
      alert("Parada cadastrada com sucesso!");
    })
    .catch((error) => {
      alert("Error ao cadastrar parada: " + error);
    });
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
const formParada = {
  selectNeighborhood: () => document.getElementById("select-bairros"),
  inputLat: () => document.getElementById("input-lat"),
  inputLgn: () => document.getElementById("input-lgn"),
};
