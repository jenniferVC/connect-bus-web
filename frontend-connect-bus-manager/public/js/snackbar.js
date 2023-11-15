function showSnackbar() {
  console.log("mostrando snackbar")
  const aside = document.createElement("aside");
  aside.classList.add("mdc-snackbar");

  const div1 = document.createElement("div");
  div1.classList.add("mdc-snackbar__surface");
  div1.setAttribute('role', 'status');
  div1.setAttribute('aria-relevant', 'additions');
  div1.innerText = "Carregando...";

  const div2 = document.createElement("div");
  div2.classList.add("mdc-snackbar__label", "visible");
  div2.setAttribute('aria-atomic', 'false');
  div2.setAttribute('aria-atomic', 'false');
  div2.innerText = "Snack...";

  aside.appendChild(div1);
  div1.appendChild(div2);

  document.body.appendChild(aside);
}

// function hideLoading() {
//   const loadings = document.getElementsByClassName("loading");
//   if (loadings.length) {
//     loadings[0].remove();
//   }
// }

{
  /* <aside class="mdc-snackbar">
<div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
  <div class="mdc-snackbar__label" aria-atomic="false">
    Can't send photo. Retry in 5 seconds.
  </div>
</div>
</aside> */
}
