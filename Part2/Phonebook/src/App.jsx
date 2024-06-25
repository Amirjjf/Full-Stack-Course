import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);

    const newFilteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredPersons(newFilteredPersons);
  };

  const addNewPerson = () => {
    const id = persons.length + 1;
    const newPersons = persons.concat({ name: newName, number: newNumber, id: id });
    setPersons(newPersons);
    // Update filteredPersons as well to include the new person
    setFilteredPersons(newPersons);
    setNewName('');
    setNewNumber('');
  };

  const checkDuplicate = (e) => {
    e.preventDefault();
    const isDuplicate = persons.some(person => person.name === newName);

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      addNewPerson();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchWord={searchWord} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        checkDuplicate={checkDuplicate}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
