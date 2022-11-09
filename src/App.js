import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import kelvinToCelcius from "./helpers/kelvinToCelcius";

function App() {
    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        async function fetchData (){
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
                console.log(result.data)
                setWeatherData(result.data)
            } catch (e) {
                console.error(e)
            }
        }
        if (location) {
            fetchData()
        }}, [location])

  return (
      <>
      <div className="weather-container">
          <SearchBar locationHandler={setLocation}/>
        <div  className="weather-header">
          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
            <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToCelcius(weatherData.main.temp)}° C</h1>
            </>}
          </span>
          <span className="weather-content"></span>
        </div>
      </div>
      </>
  );
}

export default App;
