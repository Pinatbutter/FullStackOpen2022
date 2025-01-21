import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const InputCountry = ({onChange, text}) => <div>{text}<input onChange={onChange}/><br /><br/> </div>
const DisplayCountryStats = ({country}) => {
  if(country.show === "Hide"){
      const listLanguages = Object.values(country.languages);
      return(
        <>
          <h1>{country.name}</h1>
          <div>capital {country.capital.map((element, index) =>{return index>0?  `, ${element}` : element}) }</div>
          <div>area {country.area}</div>
          <h3>languages:</h3>
          <ul>{listLanguages.map(language => <li key={language}>{language}</li>)}</ul>
          <img src={country.flag} alt="Flag" />
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {country.temperature} celcius</div>
          <img src={country.climateImg} alt="weatherIcon" />
          <div>wind {country.wind} m/s</div>
          <br /> <br /> <br />
        </>
      )
    }
  

}


const ShowFilteredCountries = ({countries, handleShow}) => {
  console.log(countries)
  if(typeof countries === 'string') return (<>{countries}</>)
  else if(countries.length === 1){
    return(<><DisplayCountryStats country={countries[0]}/></>) }

  return(
   <>
    {countries.map((country, btnIndex)=>{
        return(
          <div key={country.name}>
            {country.name} <button id={btnIndex} onClick={handleShow}>{country.show}</button>
            <div style={{border: '1px solid black'} }><DisplayCountryStats country={country} /></div>
          </div>
        )
      })}
    </>
  )

}

const App = () => {
  const [allCountries, SetAllCountries] = useState([])
  const [countryFilter, SetCountries] = useState([])
  const [basicStats, SetBasicStats] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        SetAllCountries(response.data)
      })
  }
  useEffect(hook, [])

  const weatherHook = () => {
    let borderName = [];
    let capitalName = '';
    basicStats.forEach((country, index) => {
      capitalName = (country.capital[0]==='King Edward Point' ? 'King Edward' : country.capital[0])
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${api_key}&units=metric`)
      .then(response => {
        const stats = response.data;
        const countryObject = {
          show: country.show,
          name: country.name,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flag,
          temperature: stats.main.temp,
          climateImg: `http://openweathermap.org/img/wn/${stats.weather[0].icon}@2x.png`,
          wind: stats.wind.speed
        }
        borderName.push(countryObject);
        if (borderName.length === basicStats.length) SetCountries(borderName);
      })
    })
  }
  useEffect(weatherHook, [basicStats])

  const handleFilterChange  = (e) => {
    const countryInput = e.target.value;
    const  filterIndex = (allCountries.filter(country=> country.name.common.toLowerCase().includes(countryInput.toLowerCase())))

    if (filterIndex.length===0 || countryInput === '') SetCountries("");
    else if(filterIndex.length > 10) SetCountries("Too many matches, specify another filter");
    else{
      let initialShow = (filterIndex.length === 1) ? "Hide" : "Show";
      SetBasicStats((filterIndex.map(country =>{
        const countryObject = {
        show: initialShow,
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        languages: country.languages,
        flag: country.flags.png
      }
      return countryObject;
    }) ))
    }
  }
  const handleShowCountry = (e) =>{
    let index = +e.target.id;
    SetCountries(existingItems => { return existingItems.map((item, j) => {
        if( j === index ) item.show === "Show" ? item.show = "Hide"  : item.show = "Show";
        return item
      })
    })
  }

  return(
  <>
     <InputCountry onChange={handleFilterChange} text={"find countries "} />
     <ShowFilteredCountries countries={countryFilter} handleShow={handleShowCountry} />
  </>
  )
}

export default App;