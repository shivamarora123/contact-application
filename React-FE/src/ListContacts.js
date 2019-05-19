import React,{Component} from 'react'
import propTypes from 'prop-types';
import {Link} from 'react-router-dom'
class ListContacts extends Component {
    static propTypes = {
        contacts: propTypes.array.isRequired,
        onDeleteContact: propTypes.func.isRequired
    }
    state={
        query:""
    }
    updateQuery=(query)=>{
        this.setState((currentState)=>({
            query:query.trim()
        }))
    }
    render(){
        const {query}=this.state
        const {contacts,onDeleteContact}=this.props
        const showingContacts=query===''?contacts:contacts.filter(c=>(c.name.toLowerCase().includes(query.toLowerCase())))
    return (
        <div className="list-contacts">
        <div className="list-contacts-top">
        <input 
        type="text" 
        placeholder="Search the contacts" 
        className="search-contacts"
        value={query}
        onChange={(event)=>this.updateQuery(event.target.value )} 
        />
        <Link to='/create'
        className="add-contact"
        >Add Contact</Link>
        </div>
        
        {showingContacts.length!==contacts.length && (
            <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={() => this.updateQuery("")}>Show All</button>
            </div>
        )}
        <ol className="contact-list">
            {showingContacts.map((contact) => (
               
                <li
                    className="contact-list-item"
                    key={contact.id}>
                    <div
                        className="contact-avatar"

                        style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }}></div>
                    <div className="contact-details">
                        <p>{contact.name}</p>
                        <p>{contact.handle}</p>
                    </div>
                    <button 
                    onClick={()=>onDeleteContact(contact)}
                    className="contact-remove" on>Remove</button>
                </li>
            ))}
        </ol>
        </div>
    )
}
}

export default ListContacts