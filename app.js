let pagina = 1;
const btnAnterior = document.querySelector('#btnAnterior');
const btnSiguiente = document.querySelector('#btnSiguiente');

btnAnterior.addEventListener('click', ()=>{
    if(pagina > 1 )
        pagina-=1;
    cargarPeliculas();
});

btnSiguiente.addEventListener('click', ()=>{
    if(pagina < 1000 )
        pagina+=1;
    cargarPeliculas();
});

const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=74406fddb8cc1e128a7de77d142c55a1&language=es-UY&page=${pagina}`);
     
        console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            let contenedorPeliculas = '';
            const peliculas = datos.results;
            peliculas.forEach(pelicula => {
                contenedorPeliculas += `
                <div class="pelicula">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="poster"></img>
                <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
            });

            document.querySelector('#contenedor').innerHTML = contenedorPeliculas;
        }else {
            console.log("Error "+ respuesta.status + ": La película a la que hace referencia no es correcta");   
        }
        
    } catch (error) {
        console.log(error)
    }
}
cargarPeliculas();