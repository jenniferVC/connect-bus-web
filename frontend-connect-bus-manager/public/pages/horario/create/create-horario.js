var bairrosSelecionados = [];
var horariosBairroSelecionados = [];
var horariosRodoviariaSelecionados = [];

class Horario {
  docID = "";
  linha = "";
  diaDeFuncionamento = "";
  bairros = [];
  horaPartidaBairro = [];
  horaPartidaRodoviaria = [];
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
      alert("Um Erro ocorreu ao fazer logout" + error);
    });
}

// Função da biblioteca que gera o multi-select.
new MultiSelectTag("horarios-partida-bairros", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Pesquisar", // default Search...
  onChange: function (values) {
    horariosBairroSelecionados = [];
    values.forEach((bairro) => {
      console.log(bairro);
      horariosBairroSelecionados.push(bairro.label);
    });
    console.log(horariosBairroSelecionados);
  },
});

// Função da biblioteca que gera o multi-select.
new MultiSelectTag("horarios-partida-rodoviaria", {
  rounded: true, // default true
  shadow: true, // default false
  placeholder: "Pesquisar", // default Search...
  onChange: function (values) {
    horariosRodoviariaSelecionados = [];
    values.forEach((horario) => {
      console.log(horario);
      horariosRodoviariaSelecionados.push(horario.label);
    });
    console.log(horariosRodoviariaSelecionados);
  },
});

// Verificando  se tem um paramentro na URL
// caso tenha então o consulta no banco
if (existParams()) {
  const docID = getItemURL();
  findItemByID(docID);
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
      alert("Erro ao obter documento: " + error.message);
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
  select.setAttribute("multiple", "multiple");
  select.innerHTML = bairros;

  label.appendChild(select);

  // Função da biblioteca que gera o multi-select.
  new MultiSelectTag("bairros", {
    rounded: true, // default true
    shadow: true, // default false
    placeholder: "Pesquisar", // default Search...
    onChange: function (values) {
      bairrosSelecionados = [];
      values.forEach((bairro) => {
        console.log(bairro);
        bairrosSelecionados.push(bairro.label);
      });
      console.log(bairrosSelecionados);
    },
  });
}

/**
 * Obtendo os bairros do banco e gerando as options
 * @returns string
 */
function getBairros() {
  let count = 0;
  let concat = "";

  // Itera sobre cada documento da collection "Bairros" e
  // coloca o valor do atributo "nome" dentro da tag "option"
  return neighborhoodService
    .getAll()
    .then((bairros) => {
      console.log(bairros);
      bairros.forEach((bairro) => {
        count = count + 1;
        concat += `
        <option value="${count}">${bairro.nome}</option>
        `;
      });
      return concat;
    })
    .catch((error) => {
      alert("Erro ao obter documentos: " + error.message);
      return;
    });
}

function saveItem() {
  const horario = createHorario();
  console.log(JSON.stringify(horario));
  if (existParams()) {
    // UPDATE(horario);
  } else {
    INSERT(horario);
  }
}

/**
 * Função responsável por criar um Documento.
 * @param {Horario} horario
 */
function INSERT(horario) {
  console.log(horario);
  horarioService
    .create(horario)
    .then(() => {
      alert("Horario cadastrado com sucesso!");
    })
    .catch((error) => {
      alert("Error ao cadastrar horario: " + error.message);
    });
}

/**
 * Função que verifica se existe parametro enviado pela URL
 * @returns boolean
 */
function existParams() {
  return getItemURL() ? true : false;
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
 * Pega o dia que foi selecionado no radio button
 * @returns string
 */
function getDias() {
  const form = document.querySelector("form");
  const data = new FormData(form);
  let output = "";

  for (const entry of data) {
    output = entry[1];
  }
  if (output === "SegSex") {
    return "segunda a sexta";
  }
  if (output === "DomFer") {
    return "domingos e feriados";
  }
  if (output === "sabado") {
    return "sábados";
  }
  return;
}

function createHorario() {
  const horario = new Horario();
  let selectLinha = document.getElementById("input-line-type");

  horario.linha = selectLinha.options[selectLinha.selectedIndex].value;
  horario.diaDeFuncionamento = getDias();
  horario.bairros = bairrosSelecionados;
  horario.horaPartidaBairro = horariosBairroSelecionados;
  horario.horaPartidaRodoviaria = horariosRodoviariaSelecionados;
  return horario;
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
// const formHorario = {
//   bairro: () => document.getElementById("options-nomes-bairros"),
// };
