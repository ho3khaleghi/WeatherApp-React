import { useState } from 'react';
import './App.css';
import { apiKey, apiUrl } from './components/api';
import axios from 'axios';





function App() {
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [statusWeatherData, setStatusWeatherData] = useState([])

  const weatherStatusImage = () => {
    
    
    
    

    if (statusWeatherData === "Clouds") {
      return <img className='status-image' src='./icons/clouds.png' alt='clouds' />
    }
    else if (statusWeatherData === "Clear") {
      return <img className='status-image' src='./icons/clear.png' alt='clear' />
    }
    else if (statusWeatherData === "Rain") {
      return <img className='status-image' src='./icons/rain.png' alt='rain' />
    }
    else if (statusWeatherData === "Drizzle") {
      return <img className='status-image' src='./icons/drizzle.png' alt='drizzle' />
    }
    else if (statusWeatherData === "Mist") {
      return <img className='status-image' src='./icons/clouds.png' alt='mist' />
    }
    else if (statusWeatherData === "Snow") {
      return <img className='status-image' src='./icons/snow.png' alt='snow' />
    }
    else if (statusWeatherData === "Thunderstorm") {
      return <img className='status-image' src='./icons/storm.png' alt='storm' />
    }
  }





  function handleSearchClick() {

    axios.get(`${apiUrl}${city}&appid=${apiKey}`)
    .then((response) => {
      setWeatherData(response.data)
      
      setStatus('processed')

        setStatusWeatherData(response.data.weather[0].main)

      })
      .catch(error => {
        setError(error)
        setStatus('err')
      })
    setCity('')


  }




  return (
    
      <div className='card'>
        <div className='search'>
          <input type='text'
            placeholder='enter the city name'
            className='place-holder'
            onChange={e => setCity(e.target.value)}
            value={city}
            spellCheck="false" />
          <button className='search-button'
            onClick={handleSearchClick}>
            <img src='./icons/search.png' alt='search-icon' />
          </button>
        </div>

        <div className='error'>
          {status === 'err' ? (<p className='error-msg' >inavlid city name</p>) : null}
        </div>


        <div className='weather' style={{display: status === 'processed' ? 'block' : 'none'}}>
          {weatherData.main && status === 'processed' ? (weatherStatusImage()) : null}
          {weatherData.main && status === 'processed' ? (<h1 className='temp'>{Math.round(weatherData.main.temp)}&#176;C</h1>) : null}
          {weatherData.main && status === 'processed' ? (<h2 className='city'>{weatherData.name}</h2>) : null}
          <div className='details'>
            <div className='col'>
              {weatherData.main && status === 'processed' ? (<img src='./icons/humidity.png' alt='humidity' />) : null}
              <div>
                {weatherData.main && status === 'processed' ? (<p className='humidity'>{weatherData.main.humidity}%</p>) : null}
                {weatherData.main && status === 'processed' ? (<p>humidity</p>) : null}
              </div>
            </div>
            <div className='col'>
              {weatherData.main && status === 'processed' ? (<img src='./icons/wind.png' alt='wind' />) : null}
              <div>
                {weatherData.main && status === 'processed' ? (<p className='wind'>{Math.round(weatherData.wind.speed * 3.6)} km/h</p>) : null}
                {weatherData.main && status === 'processed' ? (<p className='speed'>Wind Speed</p>) : null}
              </div>
            </div>
          </div>
        </div>

      </div>
    
  );
}

export default App;
