import React, {useState} from "react";

function BackgroundMapper ({weatherType, children}) {
    console.log(weatherType)
    const [image, setImage] = useState({})
        switch (weatherType) {
            case 'Clear':
                setImage('Clear');
            case 'Clouds':
                setImage('Clouds');
            case 'Drizzle':
                setImage('Drizzle');
            case 'Rain':
                setImage('Rain');
            case 'Snow':
                setImage('Snow');
            case 'Mist':
            case 'Haze':
            case 'Smoke':
            case 'Fog':
            default:
                setImage('Wind')
        }
    return (
        <div className="background-mapper" style={{backgroundImage: `${image}`}}>
            <div>
                {children}
            </div>
        </div>
    )
}
export default BackgroundMapper