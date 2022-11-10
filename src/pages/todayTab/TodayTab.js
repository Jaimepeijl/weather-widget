import {useEffect, useState} from "react";
import axios from "axios";
import WeatherDetail from "../../components/WeatherDetail/WeatherDetail";
import './TodayTab.css'

function TodayTab ({coord}) {
    const [forecasts, setForecasts] = useState([])
    const [error, setError] = useState(false)
    const [loading, toggleLoading] = useState(false)

    useEffect(()=> {
        async function fetchData(){
            setError(false)
            toggleLoading(true)
            try{
                const results = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}&lang=nl&units=metric`)
                setForecasts([
                    results.data.hourly[3],
                    results.data.hourly[5],
                    results.data.hourly[7]])
            } catch (e) {
                console.error(e)
                setError(true)
            }
            toggleLoading(false)
        } if (coord){
            fetchData()
        }
    }, [coord])

    function createTimeString (timestamp){
        const day = new Date(timestamp * 1000)
        return day.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    }

return(
    <div className="tab-wrapper">
        <div className="forecast-container">
        {error && <span className="no-forecast"> Oeps, er ging iets mis!</span>}
        {forecasts.length === 0 && !error && !loading &&
            <span className="no-forecast">
              Zoek eerst een locatie om het weer te bekijken
          </span>}
        {loading && <span className="no-forecast">Aan het laden ... </span>}
        <div className="times">
            {forecasts.map((forecast) => {
                return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
            })}
        </div>
        <div className="chart">
        {forecasts && forecasts.map((forecast) => {
            return <WeatherDetail
                key={forecast.dt}
                temp={forecast.temp}
                type={forecast.weather[0].main}
                description={forecast.weather[0].description}
            />
        })
        }
    </div>
        </div>
    </div>
)}
export default TodayTab