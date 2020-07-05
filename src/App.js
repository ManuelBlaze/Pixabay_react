import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import DarkSwitch from './components/DarkSwitch';

function App() {

  //state de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

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
  

  return (
    <div className="container">
      <div className="jumbotron">
        <DarkSwitch />
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null 
        : 
          (<button 
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
            >
            &laquo; Anterior
          </button>)
        }

        {(paginaActual === totalPaginas) ? null 
        :
          (<button 
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>)
        }
      </div>
    </div>
  );
}

export default App;
