import iconMapper from "../../helpers/IconMapper";
import './WeatherDetail.css';

function WeatherDetail ({description, temp, type}){
    return(
        <section className="today-details">
            <span className="icon-wrapper">
                {iconMapper(type)}
            </span>
            <p className="description">
                {description}
            </p>
            <p>{Math.round(temp)}°C</p>
        </section>
    )
} export default WeatherDetail