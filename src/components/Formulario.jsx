import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const Formulario = () => {

    //Usestate termino
    const [termino, setTermino] = useState('');

    const buscarImagenes = e => {
        e.preventDefault();

        //Validar
        if (termino.trim() === '') {
            Swal.fire({
			    icon: "error",
    			title: "Error",
				text: "Escribe lo que deseas buscar!"
			});
        }

        //Enviar a app
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        placeholder="Busca una imagen, ejemplo: edificios o atadecer"
                        className="form-control form-control-lg"
                        onChange= {e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
    )
}

Formulario.propTypes = {

}

export default Formulario
