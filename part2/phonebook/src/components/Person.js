import Persons from "../services/Persons"
const Person = ({name, number, id, handleDelete}) => {
    
    return (
        <li>
            {name} {number} <button value={id} onClick={handleDelete}>Delete</button>
        </li>
    )
}

export default Person