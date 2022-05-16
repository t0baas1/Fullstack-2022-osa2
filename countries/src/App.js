import {useEffect, useState} from 'react'
import axios from 'axios'

const SingleCountry = ({country}) =>{

  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages:</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <picture>
        <img src= {country.flag} alt='flag' style={{maxHeight: 200}}/>
      </picture>
    </div>
  )
}

const Countries = ({filtered, handleClick}) => {
  if (filtered.length >= 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length < 10 && filtered.length > 1){
    return(
      <div>
      {filtered.map(country =>
        <p key={country.name}> {country.name} <button onClick={handleClick} value={country.name}>show</button></p>
        )}
      </div>
    )
  } else if (filtered.length === 1){
    return(
      <div>
      {filtered.map(country =>
        <SingleCountry key={country.name} country={country}/>)}
      </div>
    )
  }
}

const Filter = (props) => {
  return(
    <div>find countries <input value={props.value} onChange={props.handleInput}/></div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const clickCountry = (event) => {
    setFilter(event.target.value)
  }

  const filteredList = countries.filter(country => country.name.includes(filter))


  return (
    <div>
      <Filter value={filter} handleInput={handleFilterChange} />
      <Countries filtered={filteredList} handleClick={clickCountry}/>
    </div>
  );
}

export default App;
