import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Searchbox from "./components/Searchbox";

function App() {
  const [countries, setCountries] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (searchQuery !== '') {
      axios
      .get("https://restcountries.com/v3.1/name/"+searchQuery)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    }

  }, [searchQuery])
  const handleQueryChange = (event) => {
    event.preventDefault()
    setSearchQuery(event.target.value)
  }

  return (
    <div className="App">
      <Searchbox value={searchQuery} onChange={handleQueryChange} />
      <div>
      {searchQuery.length > 0 && <Countries countries={countries} setSearchQuery={setSearchQuery}/>}
      </div>
    </div>
  );
}

export default App;
