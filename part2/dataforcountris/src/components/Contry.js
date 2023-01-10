import Weather from "./Weather"

function Country({country, setSearchQuery = null, format = 'short'}) {
    console.log(country)
    if (format === 'short') {
       return <p>{country.name.common} <button onClick={()=>setSearchQuery(country.name.common)}>show</button></p>
    } else {
        const languages =  Object.entries(country.languages).map(([key,value],i) => <li key={key}>{value}</li>)
        const lat = country.capitalInfo.latlng[0]
        const lang = country.capitalInfo.latlng[1]
        return <div>
            <h1>{country.name.common}</h1>
            <p>
                capital {country.capital[0]} <br />
                area {country.area} <br />
            </p>

            <h3>Languages:</h3>
            <ul>
                {languages}
            </ul>
            <img src={country.flags.svg} width="150" alt={country.flag}/>
            <Weather lat={lat} lang={lang} />
            </div>
    }
}

export default Country;