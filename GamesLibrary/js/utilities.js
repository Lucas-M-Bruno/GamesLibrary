//Codigo do tema escuro, alterando e deixando salvo a preferencia do usuario

const changeTheme = document.getElementById("tema");

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

//funçao de carregamento a ultima usada pelo usuario
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeTheme.addEventListener("change", function () {
  toggleDarkMode();

  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});


//FUNÇAO FEITA PARA O EVENTLISTENER DAS TAGS CRIADAS PELO JS(SE NAO FOR ASSIM ELE NAO PEGA)
function addEventListeners() {
  const detailsContent = document.querySelectorAll('.game-details');

  detailsContent.forEach(item => {
    item.addEventListener('click', () => {

      console.log("clique");

      let linkDetails = event.target.closest('.game-details');
      console.log(linkDetails);

      let conteudo = linkDetails.querySelector('.game-id');
      console.log
      let conteudoHTML = conteudo.textContent;

      let gameId = conteudoHTML;
      console.log(gameId);
      localStorage.setItem('id-Jogo', gameId)


    })
  })
};