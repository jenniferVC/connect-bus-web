var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Neighborhoods");

class Neighborhood {
  docId;
  name;
}

/**
 * Função responsável por fazer o logout do usuário e redirecioná-lo para a pagina de login
 */
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "../../../index.html";
    })
    .catch((error) => {
      alert("Um Erro ocorreu ao fazer logout", error);
    });
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
  neighborhoodService
    .findByDocId(docID)
    .then((neighborhood) => {
      hideLoading();
      if (neighborhood) {
        console.log(neighborhood);
        fillFields(neighborhood);
      } else {
        alert("Documento não encontrado");
        window.location.href = "../list/list-neighborhood.html";
      }
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documento: ", error);
    });
}

/**
 * Função responsável por preencher todos os campos da pagina.
 * @param {Neighborhood} neighborhood
 */
function fillFields(neighborhood) {
  formNeighborhood.inputNeighborhoodName().value = neighborhood.name;
}

/**
 * Função que verifica se existe parametro enviado pela URL
 * @returns boolean
 */
function existParams() {
  return getItemURL() ? true : false;
}

/**
 * Caso exista parametros na URL então significa que o item
 * esta sendo editado e precisa atualizá-lo no banco,
 * caso contrário é um novo cadastro e o insere no banco.
 */
function saveItem() {
  if (existParams()) {
    UPDATE();
  } else {
    INSERT(formNeighborhood.inputNeighborhoodName().value);
  }
}

/**
 * Função que verifica se já existe algum documento com o nome do Bairro informado.
 * Caso existe emite um Alert(), caso não então chama a função saveItem()
 * para criar o documento.
 */
function verifyIfExists() {
  neighborhoodService
    .findByEqualName(formNeighborhood.inputNeighborhoodName().value)
    .then((documents) => {
      if (documents.length > 0) {
        alert("Bairro já cadastrado! Por favor informe outro bairro.");
      } else {
        saveItem();
      }
    })
    .catch((error) => {
      console.log("Erro ao obter documentos: ", error);
    });
}

/**
 * Função responsável por criar um Documento com o nome do bairro
 * informado pelo usuário. Dentro do Documento criar um campo 'name' com
 * o nome do bairro.
 * @param {string} name
 */
function INSERT(name) {
  neighborhoodService
    .create(name)
    .then(() => {
      alert("Bairro cadastrado com sucesso!");
    })
    .catch((error) => {
      alert("Error ao cadastrar bairro: ", error);
    });
}

/**
 * Função responsável por atualizar item no banco
 */
function UPDATE() {
  showLoading();
  neighborhoodService
    .update(getItemURL(), formNeighborhood.inputNeighborhoodName().value)
    .then(() => {
      hideLoading();
      alert("Bairro atualizado com sucesso!");
    })
    .catch((error) => {
      hideLoading();
      // The document probably doesn't exist.
      console.error("Erro ao atualizar Bairro ", error);
    });
}

const formNeighborhood = {
  inputNeighborhoodName: () =>
    document.getElementById("input-name-neighborhood"),
};
