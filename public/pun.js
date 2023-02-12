var db = firebase.firestore();
 
function storeData() {
 
  var inputPun = document.getElementById("PunID").value;
  var inputCategory = document.getElementById("Category").value;
  var inputText = document.getElementById("PunText").value;
 
     db.collection("Puns").doc(inputPun).set({
         Category: inputCategory,
         PunText: inputText
     })
     .then(function() {
         console.log("Doc successful");
     })
     .catch(function(error) {
        console.error("Error writing doc", error);
     });
}