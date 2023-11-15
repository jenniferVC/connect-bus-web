function showLoading() {
  const div = document.createElement("div");
  div.classList.add("loading");

  const loading = document.createElement("div");
  loading.classList.add("circular-progress");

  div.appendChild(loading);

  document.body.appendChild(div);
}

function hideLoading() {
  const loadings = document.getElementsByClassName("loading");
  if (loadings.length) {
    loadings[0].remove();
  }
}
