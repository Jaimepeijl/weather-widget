function BackgroundMapper (type){
    switch (type) {
        case 'Clear':
            return('sun');
        case 'Clouds':
            return('cloudy');
        case 'Drizzle':
        case 'Rain':
            return('rain');
        case 'Thunderstorm':
            return('thunder');
        case 'Snow':
            return('snow');
        case 'Mist':
        case 'Haze':
        case 'Smoke':
        case 'Fog':
            return('cloudy')
        default:
            return ('default')
}}
export default BackgroundMapper;