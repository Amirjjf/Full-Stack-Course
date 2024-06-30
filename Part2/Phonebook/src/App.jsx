import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Message from './components/Message';
import Backend from './services/Backend';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To hold the type of message

  useEffect(() => {
    Backend.getAll()
      .then(fetchedPersons => {
        setPersons(fetchedPersons);
        setFilteredPersons(fetchedPersons);
      })
      .catch(error => {
        setMessage('Error fetching data');
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, []);

  useEffect(() => {
    const newFilteredPersons = persons.filter(person => 
      person.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    setFilteredPersons(newFilteredPersons);
  }, [searchWord]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const addNewPerson = () => {
    const newPerson = { name: newName, number: newNumber };
    Backend.create(newPerson)
      .then(returnedPerson => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        setFilteredPersons(newPersons); 
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${returnedPerson.name}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        setMessage('Error adding new person');
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const checkDuplicate = (e) => {
    e.preventDefault();
    const isDuplicate = persons.some(person => person.name.toLowerCase() === newName.trim().toLowerCase());

    if (isDuplicate) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson();
      }
    } else {
      addNewPerson();
    }
  };

  const deletePerson = (id) => {
    Backend.deletePerson(id)
      .then(() => {
        const newPersons = persons.filter(person => person.id !== id);
        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setMessage('Deleted successfully');
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        setMessage('Error deleting person');
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const updatePerson = () => {
    const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase());
    const newPerson = { ...personToUpdate, number: newNumber };
    Backend.update(personToUpdate.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
        setFilteredPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Updated ${returnedPerson.name}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        setMessage(`Information of ${personToUpdate.name} has already been removed from server`);
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter(person => person.id !== personToUpdate.id));
        setFilteredPersons(persons.filter(person => person.id !== personToUpdate.id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} type={messageType} />
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
      <Persons filteredPersons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
