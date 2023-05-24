var db = firebase.firestore();
var horariosCollectionRef = db.collection("Horarios");

const tbody = document.querySelector('tbody');
let documentosHorarios = [];

/**
 * Classe Horario para auxiliar na tipagem
 */
class Horario {
    bairros = [];
    tipoLinha;
    diasDeFuncionamento;
}

/**
 * Função responsável por carregar os itens na tabela
 */
function loadItens() {
    getItensBD();
    console.log(documentosHorarios);
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
        <td>${horario.tipoLinha}</td>
        <td>${horario.diasDeFuncionamento}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

function editItem(index) {
    // Função para editar o item
    console.log('editando item:' + index)
}

function deleteItem(index) {
    console.log('deletando item:' + index)
}

/**
 * Função responsável por fazer a consulta no banco.
 */
function getItensBD() {
    horariosCollectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            documentsToHorario(doc)
        });
    });
}

function documentsToHorario(doc) {
    let bairrosBanco = [];
    let horario = new Horario();

    console.log(doc.data().bairrosAtendidos)

    horario.tipoLinha = doc.id;
    horario.diasDeFuncionamento = doc.data().diaDeFuncionamento;
    bairrosBanco = Object.entries(doc.data().bairrosAtendidos);

    bairrosBanco.forEach(bairroAtendido => {
        horario.bairros = bairroAtendido[1].bairros;
        documentosHorarios.push(horario)
    })
}

loadItens();