class Onibus {
  docId;
  codigo;
  linha;
  estadoFisico;
  latitude;
  longitude;
}

// Verificando  se tem um paramentro na URL
// caso tenha então o consulta no banco
if (existParams()) {
  const docID = getItemURL();
  findItemByID(docID);
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
  onibusService
    .findByDocID(docID)
    .then((onibus) => {
      hideLoading();
      if (onibus) {
        console.log(onibus);
        fillFields(onibus);
      } else {
        alert("Documento não encontrado");
        window.location.href = "../list/list-onibus.html";
      }
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documento: " + error);
    });
}

/**
 * Função responsável por preencher todos os campos da pagina.
 * @param {Onibus} onibus
 */
function fillFields(onibus) {
  let codigo = document.getElementById("input-code");
  codigo.value = onibus.codigo;
  var linhaOpts = document.getElementById("input-line-type").options;
  for (let i = 0; i < linhaOpts.length; i++) {
    const linha = linhaOpts[i].value;
    if (onibus.linha === linha) {
      linhaOpts[i].setAttribute("selected", "selected");
    }
  }

  var estadoFisicoOpts = document.getElementById("select-estados").options;
  for (let i = 0; i < estadoFisicoOpts.length; i++) {
    const estado = estadoFisicoOpts[i].value;
    if (onibus.estadoFisico === estado) {
      estadoFisicoOpts[i].setAttribute("selected", "selected");
    }
  }
}

/**
 * Verifica se os campos Latitude e Longitude foram informados.
 * @returns
 */
function createOnibus() {
  const onibus = new Onibus();
  let selectLinha = document.getElementById("input-line-type");
  let selectEstados = document.getElementById("select-estados");
  let codigo = document.getElementById("input-code");

  onibus.docId = getItemURL();
  onibus.linha = selectLinha.options[selectLinha.selectedIndex].innerHTML;
  onibus.estadoFisico =
    selectEstados.options[selectEstados.selectedIndex].innerHTML;
  onibus.codigo = codigo.value;

  if (!onibus.docId) {
    onibus.latitude = 0;
    onibus.longitude = 0;
  }
  return onibus;
}

/**
 * Função que verifica se existe parametro enviado pela URL
 * @returns boolean
 */
function existParams() {
  return getItemURL() ? true : false;
}

function saveItem() {
  const onibus = createOnibus();
  console.log(onibus);
  if (existParams()) {
    UPDATE(onibus);
  } else {
    INSERT(onibus);
  }
}

/**
 * Função responsável por atualizar item no banco
 * @param {Onibus} onibus
 */
function UPDATE(onibus) {
  showLoading();
  console.log(onibus);
  onibusService
    .update(onibus)
    .then(() => {
      hideLoading();
      alert("Onibus atualizado com sucesso!");
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao atualizar Onibus: " + error);
    });
}

/**
 * Função responsável por criar um Documento.
 * @param {Onibus} onibus
 */
function INSERT(onibus) {
  onibusService
    .create(onibus)
    .then(() => {
      alert("Onibus cadastrado com sucesso!");
    })
    .catch((error) => {
      alert("Error ao cadastrar onibus: " + error);
    });
}
