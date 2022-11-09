import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import TodayTab from "./pages/todayTab/TodayTab";
import BackgroundMapper from "./helpers/BackgroundMapper";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {Route, Routes} from "react-router-dom";
import TabBarMenu from "./components/TabBarMenu/TabBarMenu";

import Clear from "../assets/sun.jpeg";
import Clouds from "../assets/cloudy.jpeg";
import Drizzle from "../assets/rain.jpeg";
import Rain from "../assets/rain.jpeg";
import Snow from "../assets/snow.jpeg";
import Wind from "../assets/wind.jpeg";

function App() {
    const [location, setLocation] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [error, setError] =  useState(false)
    const [type, setType] = useState('')

    const [backgroundImage, setBackgroundImage] = useState('')

    useEffect(() => {
        async function fetchData (){
            setError(false)
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=nl&units=metric`)
                console.log(result.data)
                setWeatherData(result.data)
                setType(weatherData.weather[0].main)
            } catch (e) {
                console.error(e)
                setError(true)
            }
        }
        if (location) {
            fetchData()
        }}, [location])

    useEffect(() => {
        function setImage(type) {
            setBackgroundImage(BackgroundMapper(type))
        } if (type){
            setImage()
        }
    }, [type])

  return (
      <>
      <div className="weather-container">

        <div className="weather-header">
        <BackgroundMapper backgroundImage={backgroundImage} title= {type}>

            <SearchBar locationHandler={setLocation}/>
            {error && <span className="wrong-location-error">
            Oeps! Deze locatie bestaat helemaal niet!
          </span> }
          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
            <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{Math.round(weatherData.main.temp)}°C</h1>
            </>}
          </span>
        </BackgroundMapper>
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
