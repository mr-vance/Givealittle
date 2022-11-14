import React from 'react'
import '../components/Contact.css'


function ContactCard({name, email, color}) {
  return (
    <div className='contact-container' style={{backgroundColor: color}}>
        <h4 className='title'>Name:
            <h4 className='content'>{name}</h4>
        </h4>
        <h4 className='title'>Email:
            <h4 className='content'>{email}</h4>
        </h4>
    </div>
  )
}

export default ContactCard