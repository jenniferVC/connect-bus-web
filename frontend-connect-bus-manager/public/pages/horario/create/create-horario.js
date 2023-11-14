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

// document.addEventListener("DOMContentLoaded", function (event) {
//   console.log("DOM completamente carregado e analisado");
//   getBairros().then(bairros => loadNeighborhood(bairros));
// });

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

// Verificando  se tem um paramentro na URL
// caso tenha então o consulta no banco
if (existParams()) {
  const docID = getItemURL();
  findItemByID(docID).then((horario) => {
    fillFields(horario);
  });
} else {
  getHorariosPartidaBairro();
  getHorariosPartidaRodoviaria();
  getBairros();
}

/**
 * Função responsável por consultar no banco através do ID do Document.
 * Caso encontre, então preenche os campos com a função fillFields(),
 * caso contrário o usuário é redirecionado para a pagina da tabela bairros.
 * @param {string} docID
 */
function findItemByID(docID) {
  showLoading();
  return horarioService
    .findByDocId(docID)
    .then((horario) => {
      hideLoading();
      if (horario) {
        return horario;
      } else {
        alert("Documento não encontrado");
        window.location.href = "../list/list-horario.html";
      }
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao obter documento: " + error.message);
    });
}

/**
 * Função responsável por preencher todos os campos da pagina.
 * @param {Horario} horario
 */
function fillFields(horario) {
  getBairros(horario.bairros);
  getHorariosPartidaBairro(horario.horaPartidaBairro);
  getHorariosPartidaRodoviaria(horario.horaPartidaRodoviaria);

  var linhaOpts = document.getElementById("input-line-type").options;
  for (let i = 0; i < linhaOpts.length; i++) {
    const linha = linhaOpts[i].value;
    if (horario.linha === linha) {
      linhaOpts[i].setAttribute("selected", "selected");
    }
  }

  if (horario.diaDeFuncionamento === "segunda a sexta") {
    let radioBtn = document.getElementById("SegSex");
    radioBtn.setAttribute("checked", "checked");
  }
  if (horario.diaDeFuncionamento === "domingos e feriados") {
    let radioBtn = document.getElementById("DomFer");
    radioBtn.setAttribute("checked", "checked");
  }
  if (horario.diaDeFuncionamento === "sábados") {
    let radioBtn = document.getElementById("sabado");
    radioBtn.setAttribute("checked", "checked");
  }
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
 * Carrega os horarios bairro no campo Select.
 * @param {string} horarios
 */
function loadHorarioBairro(horarios) {
  const label = document.getElementById("horarios-partida-bairros");
  const select = document.createElement("select");

  select.setAttribute("name", "horarios-bairros");
  select.setAttribute("id", "horarios-bairros");
  select.setAttribute("multiple", "multiple");
  select.innerHTML = horarios;

  label.appendChild(select);

  // Função da biblioteca que gera o multi-select.
  new MultiSelectTag("horarios-bairros", {
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
}

/**
 * Obtendo os bairros do banco e gerando as options
 * @param {string[]} bairrosEdit
 * @returns string
 */
function getBairros(bairrosEdit) {
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

        if (bairrosEdit) {
          let bairroExist = bairrosEdit.some(
            (nomeBairro) => nomeBairro === bairro.nome
          );
          if (bairroExist) {
            concat += `
                <option value="${count}" selected>${bairro.nome}</option>
                `;
          }
          if (!bairroExist) {
            concat += `
                <option value="${count}">${bairro.nome}</option>
                `;
          }
        }
        if (!bairrosEdit) {
          concat += `
                <option value="${count}">${bairro.nome}</option>
                `;
        }
      });
      loadNeighborhood(concat);
    })
    .catch((error) => {
      alert("Erro ao obter documentos: " + error.message);
    });
}

function getHorariosPartidaBairro(horarios) {
  let count = 0;
  let concat = "";
  for (let i = 0; i <= 23; i++) {
    if (horarios) {
      let horarioExist = horarios.some((hora) => hora === `${i}:00`);
      if (horarioExist) {
        concat += `
            <option value="${i}" selected>${i}:00</option>
            `;
      }
      if (!horarioExist) {
        concat += `
            <option value="${i}">${i}:00</option>
            `;
      }
    }
    if (!horarios) {
      concat += `
            <option value="${i}">${i}:00</option>
            `;
    }
  }

  loadHorarioBairro(concat);
}

function getHorariosPartidaRodoviaria(horarios) {
  let count = 0;
  let concat = "";
  for (let i = 0; i <= 23; i++) {
    if (horarios) {
      let horarioExist = horarios.some((hora) => hora === `${i}:00`);
      if (horarioExist) {
        concat += `
            <option value="${i}" selected>${i}:00</option>
            `;
      }
      if (!horarioExist) {
        concat += `
            <option value="${i}">${i}:00</option>
            `;
      }
    }
    if (!horarios) {
      concat += `
            <option value="${i}">${i}:00</option>
            `;
    }
  }

  loadHorarioRodoviaria(concat);
}

/**
 * Carrega os horarios rodoviaria no campo Select.
 * @param {string} horarios
 */
function loadHorarioRodoviaria(horarios) {
  const label = document.getElementById("horarios-partida-rodoviaria");
  const select = document.createElement("select");

  select.setAttribute("name", "horarios-rodoviaria");
  select.setAttribute("id", "horarios-rodoviaria");
  select.setAttribute("multiple", "multiple");
  select.innerHTML = horarios;

  label.appendChild(select);

  // Função da biblioteca que gera o multi-select.
  new MultiSelectTag("horarios-rodoviaria", {
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
}

async function saveItem() {
  const horario = await createHorario();
  if (existParams()) {
    UPDATE(horario);
  } else {
    INSERT(horario);
  }
}

/**
 * Função responsável por atualizar item no banco
 * @param {Horario} horario
 */
function UPDATE(horario) {
  showLoading();
  console.log(horario);
  horarioService
    .update(horario)
    .then(() => {
      hideLoading();
      alert("Horario atualizado com sucesso!");
    })
    .catch((error) => {
      hideLoading();
      alert("Erro ao atualizar Horario: " + error.message);
    });
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

async function createHorario() {
  const docID = getItemURL();
  const horario = new Horario();
  let selectLinha = document.getElementById("input-line-type");

  horario.docID = getItemURL();
  horario.linha = selectLinha.options[selectLinha.selectedIndex].value;
  horario.diaDeFuncionamento = getDias();

  let horarioBD = docID ? await findItemByID(docID) : null;

  horario.bairros =
    bairrosSelecionados.length != 0 ? bairrosSelecionados : horarioBD.bairros;
  horario.horaPartidaBairro =
    horariosBairroSelecionados.length != 0
      ? horariosBairroSelecionados
      : horarioBD.horaPartidaBairro;
  horario.horaPartidaRodoviaria =
    horariosRodoviariaSelecionados.length != 0
      ? horariosRodoviariaSelecionados
      : horarioBD.horaPartidaRodoviaria;
  return horario;
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
// const formHorario = {
//   bairro: () => document.getElementById("options-nomes-bairros"),
// };
