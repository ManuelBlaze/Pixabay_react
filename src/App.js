import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';

function App() {

  //state de la app
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {

    const consultarAPI = async () => {
      //No ejecutar la primer carga
      if(busqueda === '') return;
  
      const imagenesPorPagina = 30;
      const key = "17339973-29d7f387b2473bd5bf54592d1";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setBusqueda(resultado.hits);
    }
    consultarAPI();

  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          setBusqueda={setBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
