let buscador = document.getElementById('buscador');
let btn = document.getElementById('btn');
let caja = document.getElementById('caja');

async function getGifs(name){
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Rp6YidxPjnYQkHnoGkOuS4mrf2PSD03Y&q=${name}&limit=12&offset=0&rating=g&lang=en`);
    response = await response.json();
    console.log(response)
    return response
}

function renderViwe(gifBuscado){
    for(i=0; i < gifBuscado.data.length; i++){

        let card = document.createElement('div');
        card.classList.add('gif-block');

        let spriteContainer = document.createElement('div');
        spriteContainer.classList.add('img-container');

        let sprite = document.createElement('img');
        sprite.classList.add('gif-img')
        sprite.src = gifBuscado.data[i].images.original.url;

        let capa = document.createElement('div');
        capa.classList.add('capa');

        let title = document.createElement('h2');
        title.classList.add('title-img');
        title.textContent = gifBuscado.data[i].title

        spriteContainer.appendChild(sprite)

        spriteContainer.appendChild(capa)

        capa.appendChild(title)

        card.appendChild(spriteContainer)

        caja.appendChild(card)
        
        sprite.addEventListener('click', ()=>{
            console.log(gifBuscado.data[i])
            localStorage.setItem('gif', JSON.stringify(gifBuscado[i]))
        })
    }
}

btn.addEventListener('click', () =>{
    caja.innerHTML = "";
    getGifs(buscador.value)
    .then((response) => renderViwe(response))
    .catch((error) => console.error(error))
})