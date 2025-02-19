//API
const url = 'https://api.rawg.io/api/games?dates=2023-01-01%2C2024-06-30&key=ec67d72d8d994fcebcd775b324bd542d&page=1';
const apiKey = "ec67d72d8d994fcebcd775b324bd542d";
const nextBtn = document.getElementById('seeMoreBtn');
let nextUrl = null;

const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(each => each.platform.name).join(", ");

    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr
}

async function allGames(url) {

    await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            nextUrl = data.next ? data.next : null; // aqui com o operador ternario verifiquei se existia ou nao a possibilidade de trocar de pagina
            const games = data.results

            games.forEach(game => {
                const gamesList = document.getElementById('allGames');
                let gameItem = document.createElement("li");
                gameItem.classList.add("list-itens");

                gameItem.innerHTML = `
              <a class="game-details" href="/html/details.html">
              <div class="fav-add">
                            <input type="checkbox" name="fav" id="fav">
                            <label for="fav">
                                <i id="noAdd" class="fa-regular fa-heart"></i>
                                <i id="add" class="fa-solid fa-heart"></i>
                            </label>
                        </div>
                <img src="${game.background_image}" alt="">
                <h3 class="game-name">${game.name}</br>
                    <span class="plataforms"> ${getPlatformStr(game.parent_platforms)}</span>
                </h3>
                <span class="d-flex flex-column info">
                    <div><i class="fa-solid fa-star"></i>${game.rating}</div>
                    <div><i class=" mt-1 fa-solid fa-calendar"></i> ${game.released}</div>
                </span>
                <div class ="d-none game-id">${game.id}</div>
              </a>   
            `;
                gamesList.appendChild(gameItem);
            });
            addEventListeners();
        })
};

allGames(url);

//aqui essa funçao apenas carrega mais jogos quando e clicada, poderia ser feita no escopo global, mas fiz uma function
function next() {
    nextBtn.addEventListener('click', () => {
        allGames(nextUrl);
    });
};

next();

//PARTE DO CODIGO DEDICADA A BARRA DE PESQUISA

async function searchGame() {
    const query = document.getElementById('search').value;
    const resultsContainer = document.getElementById('allGames');

    // Limpa os resultados anteriores
    resultsContainer.innerHTML = '';

    if (query.trim() === '') {
        allGames(url);
    }

    fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}`)
     .then((resp) => resp.json())
     .then((data) =>{
        data.results.forEach(game => {
            const gameCard = document.createElement('li');
            gameCard.classList.add('list-itens');
            gameCard.innerHTML = `
                <a class="game-details" href="/html/details.html">
                <img src="${game.background_image}" alt="">
                <h3 class="game-name">${game.name}</br>
                    <span class="plataforms"> ${getPlatformStr(game.parent_platforms)}</span>
                </h3>
                <span class="d-flex flex-column info">
                    <div><i class="fa-solid fa-star"></i>${game.rating}</div>
                    <div><i class=" mt-1 fa-solid fa-calendar"></i> ${game.released}</div>
                </span>
                <div class ="d-none game-id">${game.id}</div>
              </a>
            `;
            resultsContainer.appendChild(gameCard);
        });
        addEventListeners();
     })
};

document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        searchGame();
    }
});