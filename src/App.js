import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import TodayTab from "./pages/todayTab/TodayTab";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {Route, Routes} from "react-router-dom";
import TabBarMenu from "./components/TabBarMenu/TabBarMenu";
import BackgroundMapper from "./helpers/BackgroundMapper";

function App() {
    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [error, setError] =  useState(false)
    const [type, setType] = useState('wind')
    const [image, toggleImage] = useState('wind')

    useEffect(() => {
        async function fetchData (){
            setError(false)
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=nl&units=metric`)
                setWeatherData(result.data)
                setType(result.data.weather[0].main)
            } catch (e) {
                console.error(e)
                setError(true)
            }
        }
        if (location) {
            fetchData()
        }}, [location])

    useEffect(() => {
        function setImage(type){
            toggleImage(BackgroundMapper(type))
        } if (type) {
            setImage(type)
        }
    }, [type])

  return (
      <>
      <div className="weather-container">
        <div className="weather-header" style={{backgroundImage: `url(/img/${image}.jpeg`}}>
            <SearchBar locationHandler={setLocation}/>

          <div className="location-details">
              {error && <h3>
            Oeps! Deze locatie bestaat helemaal niet!
          </h3> }
              {Object.keys(weatherData).length <= 0 && !error &&
                  <><h2>Welkom!</h2>
              <h3>Voer hierboven een stad in om de weer gegevens te zien</h3></>}
            {Object.keys(weatherData).length > 0 &&
            <div className="capitalize">
                <h3>{weatherData.name}</h3>
                <h2>{weatherData.weather[0].description}</h2>
                <h1>{Math.round(weatherData.main.temp)}°C</h1>
            </div>}
          </div>
        </div>
          <span className="weather-content">
              <TabBarMenu/>
              <div className="tab-wrapper">
                  <Routes>
              < Route exact path="/"
                      element={<TodayTab coord={weatherData.coord}/>}
              />
              <Route path="/komende-week"
                     element={<ForecastTab coord={weatherData.coord}/>}
              />
            </Routes>
              </div>
          </span>
      </div>
      </>
  );
}

export default App;
