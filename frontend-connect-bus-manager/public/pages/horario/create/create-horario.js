var db = firebase.firestore();

var bairrosCollectionRef = db.collection("Neighborhoods");

/**
 * Carrega os nomes dos bairros no campo Select.
 */
function loadNeighborhood() {
    const select = document.getElementById('options-nomes-bairros');
    select.innerHTML = '';

    // Itera sobre cada documento da collection "Bairros" e
    // coloca o valor do atributo "nomeBairro" dentro da tag "option"
    bairrosCollectionRef.get().then((querySnapshot) => {
        querySnapshot.forEach((docBairro) => {
            let option = document.createElement("option");
            // option.innerHTML = docBairro.data().nomeBairro;

            option.innerHTML = `
                <option>${docBairro.data().nomeBairro}</option>
            `
            select.appendChild(option);
        });
    }).catch(err =>  alert(err) );
}

function convertBairroToOption(bairro){

}

function save(){
    let selectLinha = document.getElementById("input-line-type");
    console.log(selectLinha.options[selectLinha.selectedIndex].value);

    let selectBairro = document.getElementById("options-nomes-bairros");
    console.log(selectBairro.options[selectBairro.selectedIndex].value);
}

/**
 * Objeto que irá receber os dados informados no formulario
 */
const formHorario = {
    inputBairroNome: () => document.getElementById("options-nomes-bairros"),
}