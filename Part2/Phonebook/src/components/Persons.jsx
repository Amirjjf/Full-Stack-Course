import React from 'react';

const Persons = ({ filteredPersons, onDelete }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      onDelete(id);
    }
  };

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}> 
          {person.name} {person.number}
          <button 
            onClick={() => handleDelete(person.id, person.name)} 
            style={{
              marginLeft: "10px",
              color: "white",
              backgroundColor: "#007ae6",
              border: "none",
              borderRadius: "3px"
            }}
          >
            Delete
          </button>
        </li> 
      ))}
    </ul>
  );
};

export default Persons;
