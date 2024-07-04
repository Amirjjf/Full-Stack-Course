import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import Weather from './components/Weather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCountries([]);
      setSelectedCountry(null);
    } else {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
      if (filtered.length === 1) {
        setSelectedCountry(filtered[0]);
      } else {
        setSelectedCountry(null);
      }
    }
  }, [search, countries]);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital.length > 0) {
      const capital = selectedCountry.capital[0];
      const apiKey = import.meta.env.VITE_SOME_KEY || '21ff50f632e067eb0c5ebe1e19d29628';
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;
      axios
        .get(url)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    } else {
      setWeather(null);
    }
  }, [selectedCountry]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    setFilteredCountries([country]);
  };

  return (
    <>
      <div>
        find countries: <input value={search} onChange={handleChange} />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map(country => (
            <div key={country.cca2}>
              <p>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>Show</button>
              </p>
            </div>
          ))
        ) : filteredCountries.length === 1 ? (
          <>
            {selectedCountry && <Country country={selectedCountry} />}
            {weather && (
              <Weather weather={weather} selectedCountry={selectedCountry} />
            )}
          </>
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </>
  );
};

export default App;
