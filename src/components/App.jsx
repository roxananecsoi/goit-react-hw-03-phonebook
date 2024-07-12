// App.jsx
import React from 'react';
import { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import storage from './service/storage';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const storedContacts = storage.load('contacts') || [];

      this.setState({
        contacts: storedContacts,
      });
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    try {
      if (this.state.contacts !== prevState.contacts) {
        storage.save('contacts', this.state.contacts);
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleFilterChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts:</h2>
        <SearchFilter
          filter={filter}
          onFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
          className={styles.list}
        />
      </div>
    );
  }
}

export default App;
