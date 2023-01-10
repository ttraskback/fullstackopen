import { useState } from 'react'
import Filter from './Filter'
import Person from './Person'

const Persons = ({persons,handleDelete}) => {
    const [filter, setFilter] = useState('')

    const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().indexOf(filter) !== -1)

    const content = personsToShow.map((person) =>    
        <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete}/>
    );

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
   
    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <ul>
                {content}
            </ul>
        </div>
    )
}
export default Persons