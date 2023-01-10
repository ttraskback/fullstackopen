import {useState, useEffect } from "react";
import axios from "axios";
function Weather ({lat, lang}) {
    const apiKey = process.env.REACT_APP_API_KEY
    const [weatherData, setweatherData] = useState(undefined)

    const weatherurl = `https://api.openweathermap.org//data/2.5/weather?lat=${lat}&lon=${lang}&exclude=daily,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    useEffect(() => {
        axios
          .get(weatherurl)
          .then(response => {
            console.log('weather fulfilled')
            setweatherData(response.data)
          })
      },[weatherurl]);

      if (weatherData === undefined){
        return <p>Loading ....</p>
      }else{
        const icon = weatherData.weather[0].icon
        return <div key={lat.toString()+lang.toString()}>
            Temperature: {weatherData.main.feels_like}<br />
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" /> <br />
            Wind: {weatherData.wind.speed}<br />
        </div>
      }

}

export default Weather;