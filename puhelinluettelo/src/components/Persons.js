import React from 'react'

const Person = ({name, number, deletePerson}) => {
    return(
        <p> {name} {number} <button onClick={deletePerson}>delete</button></p>
    )
}

const Persons = ({persons, deletePerson}) => {
    return(
        <ul>
        {persons.map(person =>
            <Person key={person.name} name={person.name} number={person.number}deletePerson={() => deletePerson(person)}/>
        )}
        </ul>
    )
}

export default Persons