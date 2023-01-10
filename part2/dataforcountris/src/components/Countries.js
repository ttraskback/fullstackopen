import Country from "./Contry";
function Countries({countries, setSearchQuery}) {
    if (countries.length > 10){
        return <p>To many matches, specify another filter.</p>
    } else if(countries.length > 1){
        return countries.map(country => {
            return <Country key={country.ccn3} country={country} format={"short"} setSearchQuery={setSearchQuery}/>
        });
    } else {
        return countries.map(country => {
            return <Country key={country.ccn3} country={country} format={"long"}/>
        });
    }
}

export default Countries;