// slick carrossel de imagens, aqui mostra os destaques iniciais de jogos
$(document).ready(function () {
  $(".carrousel-wrapper").slick({
    //sempre escolha o conteiner pais dos itens que estarao no carrossel
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 1,
  });
});

//PARTE DEDICADA A API
//PEGAR DADOS QUE PRECISO(EDITAR A URL CASO QUEIRA SABER OS DADOS DE OUTRA PAGINA OU JOGO ESPECIFICO)
// const url = 'https://api.rawg.io/api/games?dates=2020-01-01%2C2024-12-31&key=ec67d72d8d994fcebcd775b324bd542d&page=9'; (nessa url pesquisamos por pagina)
const url = 'https://api.rawg.io/api/games?search=diablo-iv&key=ec67d72d8d994fcebcd775b324bd542d'; //nessa pelo nome do jogo
const apiKey = "ec67d72d8d994fcebcd775b324bd542d";

async function chamarApi() {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

chamarApi();

//AQUI ONDE USO A API PARA PEGAR OS DADOS DO CARROSEL DE DESTAQUES
async function featuredGames(gameId, imgElementId, nameElementId, idElement) {
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

  await fetch(url)
    .then((resp) => resp.json())
    .then((data) => {

      document.getElementById(imgElementId).src = data.background_image;
      document.getElementById(nameElementId).textContent = data.name;
      document.getElementById(idElement).textContent = data.id;
    });
};

featuredGames(457729, "featured1", "name1", "gameId-1");
featuredGames(906547, "featured2", "name2", "gameId-2");
featuredGames(962676, "featured3", "name3", "gameId-3");

//AQUI E ONDE CRIO AS LI'S COM OS DADOS DA MINHA API(ESSA PRIMEIRA FUNCTION E PARA OS JOGOS LANÇAMENTOS)
async function gameData(gameId, listId) {
  const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

  await fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data);

      let gamesContainer = document.getElementById(listId);

      let gameItem = document.createElement("li");
      gameItem.classList.add("list-itens");

      gameItem.innerHTML = `
              <a class="game-details" href="/html/details.html">
                <img src="${data.background_image}" alt="">
                <h3 class="game-name">${data.name}</h3>
                <span class="plataforms">
                   <i class="fa-solid fa-star"></i> ${data.rating}
                </span>
                <div class ="d-none game-id">${data.id}</div>
              </a>
              
            `;

      gamesContainer.appendChild(gameItem);
    });
  addEventListeners();
}

//ADICIONEI TODOS OS ID'S QUE IA USAR EM CADA LISTA EM ARRAYS(CONJUNTOS) PARA CONSEGUIR USAR O forEach
const newGamesIds = [41494, 727315, 326243, 494384, 58779];
const morePlayersIds = [3498, 8488, 415171, 23598, 388309];

//CONSEGUI CHAMAR AS FUNÇOES VIA *forEach* PARA FICAR MAIS LIMPO O CODIGO
newGamesIds.forEach(id => gameData(id, "newGame"));
morePlayersIds.forEach(id => gameData(id, "morePlayers"));