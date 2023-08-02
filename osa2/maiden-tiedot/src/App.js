import { useEffect, useState } from "react"
import axios from "axios"

const SearchField = ({ value, handler}) => {
  return<div>Find countries <input value={value} onChange={handler}/></div>
}

const DisplaySearchedCountries = ({countries, country, showCountry}) => {
  if (country.length === 0 && (countries.length === 0 || countries.length > 10)) {
    const msg = countries.length === 0 ? "No matches." : "Too many matches, please specify search."
    return <div>{msg}</div>
  } else if (country.length === 0){
  return (
    countries.map(country => {return(
      <div key={country}>
        <div>{country}</div>
        <button onClick={() => showCountry(country)}>Show</button>
      </div>
    )
    })
  )
  } else {
    const langs = Object.values(country.languages)
    return(
      <div>
        <h2>{country.name.official}</h2>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h4>Languages</h4>
        <ul>
          {langs.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png}/>
      </div>
  
    )
  }
}

const App = () => {
  const [search, setSearch] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])
  const [specificCountry, setSpecificCountry] = useState([])

  const handleSearchChange = (val) => {
    setSearch(val.target.value)
    const filteredCountries = allCountries.filter(country => country.toLowerCase().includes(val.target.value.toLowerCase()))
    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      setSearchedCountries(filteredCountries)
      setSpecificCountry([])
    } else if (filteredCountries.length > 10 || filteredCountries.length < 1){
      setSearchedCountries([])
      setSpecificCountry([])
    } else if (filteredCountries.length === 1){
      const oneCountry = filteredCountries.map(country => country)
      setSearchedCountries([])
      getCountryInfo(oneCountry)
    }
  }

  const getCountriesNames = () => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((retValue) => {setAllCountries(
      retValue.data.map(country => country.name.common)
    )
    })
  }

  const getCountryInfo = (oneCountry) => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${oneCountry}`
    axios
    .get(url)
    .then((retValue) => {
      setSpecificCountry(retValue.data)
    })
  }

  useEffect(
    getCountriesNames,
    []
  )

  const showCountry = (country) => {
    getCountryInfo(country)
  }

  return (
    <div>
     <SearchField value={search} handler={handleSearchChange}/> 
     <DisplaySearchedCountries countries={searchedCountries} country={specificCountry} showCountry={showCountry}/>
    </div>
  )
}

export default App
