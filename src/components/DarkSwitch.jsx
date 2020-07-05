import React from 'react';
import PropTypes from 'prop-types';

const DarkSwitch = ({ setCarga, darkMode, setDarkMode}) => {

	//Selector de al etiqueta tema en head
	const style = document.querySelector('#tema');
	let href = style.getAttribute('href');

	//Ejecutar función llamar Spinner
	const spinner = () => {		
		setCarga(true);
		if (darkMode) {
			setDarkMode(false);
			dL();			
		} else {
			setDarkMode(true);
			dM();
		}
	}
	

	//DarkMode On
	const dM =() => {
		href = "https://bootswatch.com/4/darkly/bootstrap.min.css";
		style.setAttribute('href', href);
	}

	//DarkMode Off
	const dL =() => {		
		href = "https://bootswatch.com/4/journal/bootstrap.min.css";
		style.setAttribute('href', href);
	}

    return (
		<div className="custom-control custom-switch">
			<input 
				type="checkbox" 
				className="custom-control-input" 
				id="darkSwitch" 
				onClick={spinner}
				defaultChecked={darkMode}
			/>
			<label 
				className="custom-control-label" 
				htmlFor="darkSwitch"
			>
				<i 
				className={darkMode ? 'far fa-moon' : 'far fa-sun'}
				></i>
			</label>
		</div>
	);
}

DarkSwitch.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	setDarkMode: PropTypes.func.isRequired,
	setCarga: PropTypes.func.isRequired
}

export default DarkSwitch
