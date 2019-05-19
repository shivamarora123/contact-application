import React from 'react';
import {Link} from 'react-router-dom'
import ImageInput from './ImageInput';
import serliazeForm from 'form-serialize'
class CreateContact extends React.Component{
    handleSubmit=(e)=>{
        e.preventDefault()
        const values=serliazeForm(e.target,{hash:true})
        values.id = Math.random().toString(36).substr(-8)
        if (this.props.onCreateContact) this.props.onCreateContact(values)
    }
render(){
    return(
        <div>
            <Link to="/" className="close-create-contact">Close</Link>
            <form className="create-contact-form" onSubmit={this.handleSubmit}>
                <ImageInput className="create-contact-avatar-input" name='avatarURL' maxHeight={64} />
            <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="handle" placeholder="Handle" />
            <input type="text" name="email" placeholder="Email" />
            <button> Add Contact</button>
            </div>
            </form>
        </div>
    )
}
}
export default CreateContact