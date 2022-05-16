import React from 'react'

const PersonForm = ({personName, personNumber, handleSubmit, handleName, handleNumber}) => {
    return ( 
    <form onSubmit={handleSubmit}>
        <div>name: <input value={personName} onChange={handleName}/></div>
        <div>number: <input value={personNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
    </form>
    )
}

export default PersonForm