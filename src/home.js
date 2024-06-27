import { useState, useEffect } from "react";
import axios from "axios";
import {} from "react-icons/wi";
import Weathericon from "./weatherIcon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    const [city, setCity] = useState(null);
    const [locationAPI, setLocationAPI] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [locationIsPending, setLocationIsPending] = useState(true);
    const [weatherError, setWeatherError] = useState(null);
    const [weatherIsPending, setWeatherIsPending] = useState(true);
    const API_KEY = "RxFnCH9o8tG93Hg078qhNGHtp9Usw0ws";

 
    const HandleChange = (event) => {
        setCity(event.target.value);
    }

    

    const FetchWeather = () => {
        setLocationAPI(null);
        setWeatherData(null);
        setLocationError(null);
        setLocationIsPending(true);
        setLocationError(null);
        setWeatherIsPending(true);
        const locationKey = axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
        .then(res => {
            const locationKey = res.data[0]["Key"];
            setLocationAPI(locationKey);
            setLocationIsPending(false);
            console.log(locationKey);
            const weather_data = axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`)
                .then(res => {
                    setWeatherData(res.data);
                    setWeatherIsPending(false);
                   console.log(res.data);
                }).catch(err => {
                    setWeatherError(err.message);
                    toast.error('Could not fetch weather data!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                    setWeatherIsPending(false);
                });
                

        }).catch(err => {
            setLocationError(err.message);
            toast.error('Please enter a valid location!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setWeatherError(null);
            setLocationIsPending(false);
            setWeatherIsPending(false);
        });
        const weather_info_div = document.querySelector(".weather-info")
        weather_info_div.classList.add("weather-info-animate"); 
        weather_info_div.addEventListener('animationend',() => {
            weather_info_div.classList.remove('weather-info-animate');
        },{once:true});
        };

    return ( 
        <div className="home-page">

            <h1>Weather Capsule...</h1>
            <div className="enter-city">
                <input type="text" placeholder="Enter city..." onChange={HandleChange} />
                <div><button className="submit-city-btn" onClick={FetchWeather}>Submit city</button></div>
            </div>
            <div className="weather-info">
                <div className="weather-comp">{city}</div>
                {(!city) && <div>Enter city...</div>}
                {((locationIsPending || weatherIsPending) && city) && <div>Loading...</div>}
                {(locationError) && <div>Location not found!</div>}
                {(weatherError) && <div>Weather data could not be fetched for the entered location</div>}
                {weatherData && <div className="weather-comp"><Weathericon iconNo={weatherData[0]["WeatherIcon"]}></Weathericon></div>}
                {weatherData && <div className="weather-comp">{weatherData[0]["WeatherText"]}</div>}
                {weatherData && <div className="weather-comp">Temperature: {weatherData[0]["Temperature"]["Metric"]["Value"]}°C</div>}
                {weatherData && <div className="weather-comp">Humidity: {weatherData[0]["RelativeHumidity"]}%</div>}
            </div>
            <ToastContainer/>
        </div>
     );
    
}
 
export default Home;