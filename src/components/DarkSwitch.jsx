import React from 'react';

const DarkSwitch = () => {
    return (
		<div className="custom-control custom-switch">
			<input type="checkbox" className="custom-control-input" id="darkSwitch" />
			<label className="custom-control-label" htmlFor="darkSwitch" id="iconoDM">
				<i className="far fa-sun"></i>
			</label>
		</div>
	);
}

export default DarkSwitch
