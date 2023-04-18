var db = firebase.firestore();
var bairrosCollectionRef = db.collection("Bairros");
const tbody = document.querySelector('tbody');


/**
 * Função que converte cada item do banco para um item HTML da tabela
 * @param {string} nomeBairro 
 * @param {number} index 
 */
function convertBairro(nomeBairro, index) {
    console.log('chamando o gerador de html')
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <tr>
            <td>lala</td>
            <td class="acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
            </td>
            <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
        </tr>
    `
    tbody.appendChild(tr)
}



/**
 * Função responsável por carregar os itens na tabela
*/
function loadItens() {
    console.log('load itens');
    getItensBD();
    //tbody.innerHTML = ''
    // itens.forEach((nomeBairro, index) => {
    //     convertBairroToTR(nomeBairro, index)
    // })
}

function getItensBD() {
    let itens = [];
    let tr = document.createElement("tr");
    let index = 1;

    // bairrosCollectionRef.get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         if(doc.id === 'bairros'){
    //             console.log(doc.id + '=>' + doc.data().bairros)
    //             itens = doc.data().bairros;
    //             console.log('itens 1: ' + itens);

    //         }
    //     });
    // });

    console.log('itens 2: ' + itens);

}
loadItens();