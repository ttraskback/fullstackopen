const AddForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            name:&nbsp;
            <input
                value={newName}
                onChange={handleNameChange}
                />
            </div>
            <div>number:&nbsp;
            <input 
                value={newNumber}
                onChange={handleNumberChange}
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}


export default AddForm