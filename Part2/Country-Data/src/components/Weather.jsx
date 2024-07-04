const Weather = ({ weather, selectedCountry }) => {
    return (
      <div>
        {weather && (
          <div>
            <h2>Weather in {selectedCountry.capital[0]}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description} icon`} />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  }
  
  export default Weather;
  