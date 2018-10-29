import React from 'react';
import './FaceRecognation.css';


const FaceRecognation = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
		  <div className='absolute mt2'>
		    <img id='inputImage' alt='' src={imageUrl} width='500px' heigh='auto'/>
		    <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomCol, left: box.leftCol}}></div>
		  </div>
		</div>  
	);
}

export default FaceRecognation;