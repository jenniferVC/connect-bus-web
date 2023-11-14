document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM completamente carregado e analisado");
  getBairros();
});

class Parada {
  docId;
  bairro;
  latitude;
  longitude;
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
 * Obtendo os bairros do banco e gerando as options
 * @param {string[]} bairrosEdit
 * @returns string
 */
function getBairros() {
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
        concat += `
                  <option value="${count}">${bairro.nome}</option>
                  `;
      });
      loadNeighborhood(concat);
    })
    .catch((error) => {
      alert("Erro ao obter documentos: " + error.message);
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
    //   UPDATE(horario);
  } else {
    INSERT(parada);
  }
}

/**
 * Função responsável por criar um Documento.
 * @param {Parada} parada
 */
function INSERT(parada) {
  console.log(parada);
  paradaService
    .create(parada)
    .then(() => {
      alert("Parada cadastrada com sucesso!");
    })
    .catch((error) => {
      alert("Error ao cadastrar parada: " + error.message);
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
