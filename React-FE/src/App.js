import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'
import {Route} from 'react-router-dom'
class App extends Component {
  state={
    contacts:[],
  }
  componentDidMount(){
    ContactsAPI.getAll().then(contacts => this.setState(() => ({ contacts})))

  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter(c => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
  }
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => this.setState((currentState) => ({ contacts: currentState.contacts.concat([contact]) })))
  }
  render() {
    return (
      <div>
        <Route path='/' exact render={({history}) => (

          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )} />
        <Route path='/create' exact render={({history}) => (

          <CreateContact onCreateContact={(contact) =>{ this.createContact(contact); history.push('/')  }}    />
        )} />

      </div>
    );
  }
}

export default App;
