import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import DarkSwitch from './components/DarkSwitch';
import Spinner from './components/Spinner';

function App() {

  //state de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [carga, setCarga] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {

    const consultarAPI = async () => {
      //No ejecutar la primer carga
      if(busqueda === '') return;
  
      const imagenesPorPagina = 30;
      const key = "17339973-29d7f387b2473bd5bf54592d1";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);
      
      //Calcular total de paginas
      const calcularTotalPag = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPag);

      //Mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: "smooth"});
    }
    consultarAPI();

  }, [busqueda, paginaActual])

  //definir pag anterior
  const paginaAnterior = () => {
    const nPaginaActual = paginaActual -1;

    if (nPaginaActual === 0) return;
      
    setPaginaActual(nPaginaActual);
  }
  //definir pag siguiente
  const paginaSiguiente = () => {
    const nPaginaActual = paginaActual + 1;

    if (nPaginaActual > totalPaginas) return;
      
    setPaginaActual(nPaginaActual);
  }

  //Mostrar Spinner solo 3 segundos
  useEffect(() => {
		setTimeout(() => {
      setCarga(false);
		}, 3000);
  }, [carga, setCarga]);
  
  return (
		<div>
			{/* Carga condicional del spinner o contenido */}
			{carga ? (
				<Spinner />
			) : (
				<div className="container">
					<div className="jumbotron">
						{/* DarkSwitch component */}
						<DarkSwitch
							setCarga={setCarga}
							darkMode={darkMode}
							setDarkMode={setDarkMode}
						/>
						<p className="lead text-center">
              <a 
                href="https://github.com/ManuelBlaze/Pixabay_react" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              Buscador de Imágenes</p>

						<Formulario setBusqueda={setBusqueda} />
					</div>

					<div className="row justify-content-center">
						<ListadoImagenes imagenes={imagenes} />

						{paginaActual === 1 ? null : (
							<button className="btn btn-info mr-1" onClick={paginaAnterior}>
								&laquo; Anterior
							</button>
						)}

						{paginaActual === totalPaginas ? null : (
							<button className="btn btn-info" onClick={paginaSiguiente}>
								Siguiente &raquo;
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
