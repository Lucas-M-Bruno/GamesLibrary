document.addEventListener("DOMContentLoaded", () => {
    let gameId = localStorage.getItem('id-Jogo');
    let final = parseInt(gameId, 10);
    console.log(final);
    details(final);
});


const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(each => each.platform.name).join(", ");

    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + "...";
    }
    return platformStr
}

function details(gameId) {
    const url = `https://api.rawg.io/api/games/${gameId}?key=ec67d72d8d994fcebcd775b324bd542d`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {

            // let gameName1 = data.name;
            // console.log(gameName1);
            const aside = document.getElementById('aside');
            aside.innerHTML = `
        <div class="container p-0"> 
            <img class="img-fluid rounded" src="${data.background_image}" alt="${data.name}">
        </div> 
        
        <span class="text-center fs-4 d-flex flex-column info">
            <div class="mt-4">Disponivel para: ${getPlatformStr(data.parent_platforms)}</div>
            <div><i class="mt-4 fs-5 fa-solid fa-star"></i>${data.rating}</div>
            <div><i class=" mt-4 fs-5 fa-solid fa-calendar"></i> ${data.released}</div>
        </span>
      `
            const name = document.getElementById('h1');
            name.innerText = `${data.name}`

            const desc = document.getElementById('description');
            desc.innerHTML = `${data.description}`

            const time = document.getElementById('time');
            //   time.innerHTML = `<div id="bkg" class="mt-5 text-center fs-2 border rounded-pill p-3">${data.playtime} horas de GamePlay</div>`

            let gameTime = data.playtime;

            if (gameTime == 0) {
                time.innerHTML = `<div id="bkg" class="mt-5 text-center fs-2 border rounded-pill p-3">Este jogo e Online</div>`
            } else {
                time.innerHTML = `<div id="bkg" class="mt-5 text-center fs-2 border rounded-pill p-3">${gameTime} horas de GamePlay</div>`
            }

        })
};