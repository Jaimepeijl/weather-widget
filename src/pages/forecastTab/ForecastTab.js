import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import createDateString from "../../helpers/createDateString";

function ForecastTab({coord}) {
    const [forecasts, setForecasts] = useState([])
    const [error, setError] = useState(false)
    const [loading, toggleLoading] = useState(false)

    useEffect(() => {
        async function fetchData(){
            setError(false)
            toggleLoading(true)
            try{
                const results = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=nl`)
                setForecasts(results.data.daily.slice(1, 6))
                console.log(forecasts)
            } catch (e) {
                console.error(e)
                setError(true)
            }
            toggleLoading(false)
        } if(coord) {
            fetchData()
        }
    }, [coord])


    return (
        <div className="tab-wrapper">
            <div className="forecast-container">
            {loading &&
                <span>
                    Aan het laden ...
                </span>}
            {forecasts.length === 0 && !error && !loading &&
                <span className="no-forecast">
              Zoek eerst een locatie om het weer te bekijken
                </span>}
            {error &&
                <span>
                    Er is iets misgegaan met het ophalen van de data
                </span>}
            {forecasts && forecasts.map((day) => {
                return (
                    <article className="forecast-day" key={day.dt}>
                        <p className="day-description">
                            {createDateString(day.dt)}
                        </p>

                        <section className="forecast-weather">
                            <span>
                              {Math.round(day.temp.day)}°C
                            </span>
                            <span className="weather-description">
                              {day.weather[0].description}
                            </span>
                        </section>
                    </article>
                )
            })}
            </div>
        </div>
    );
}

export default ForecastTab;
