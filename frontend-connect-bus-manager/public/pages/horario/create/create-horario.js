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
      console.log(values);
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

// function saveItem() {
//   let selectLinha = document.getElementById("input-line-type");
//   console.log(selectLinha.options[selectLinha.selectedIndex].value);

//   let selectBairro = document.getElementById("options-nomes-bairros");
//   console.log(selectBairro.options[selectBairro.selectedIndex].value);
// }

/**
 * Objeto que irá receber os dados informados no formulario
 */
// const formHorario = {
//   inputBairroNome: () => document.getElementById("options-nomes-bairros"),
// };
