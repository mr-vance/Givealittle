import Navigation from "../components/Navigation";
import React, { useRef, useContext, useState } from "react";
import { NameContext } from "../Context";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import './Contact.css';
import { useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase-config';

export default function Contact() {
  const form = useRef();
  const {name, setName} = useContext(NameContext);
  const [userName, setUserName] = useState(""); 

  const [Users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(collection(db, "Users"));
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers()
    }, []);
    
    useEffect(() => {
      for (let i in Users){
        if(Users[i].Email == name){
          setUserName(Users[i].Name)
        }
      }
    }, [Users])

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jqq0ke6",
        "template_62hvg2x",
        form.current,
        "V_itaO6_FgMhs0fH8"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          alert("Message Sent Successfully, We'll Get Back To You Soon");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Navigation />
      <br />
      <h2 className="heading">Contact Us</h2>
      <div className="contact-card">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <br />
        <div className="block2">
          <input
            className="contact-input"
            type="text"
            name="user_name"
            placeholder="Enter Your Name"
            value={userName}
          />
          <br/>
          <input
            className="contact-input"
            type="email"
            name="user_email"
            placeholder="Enter Your Email"
            value={name}
          />
          <br />
          <textarea
            className="contact-textarea"
            name="message"
            placeholder="What Would You Like To Tell Us?"
          />
        </div>
        <br />
        <input type="submit" value="Submit" className = "subbut"/>
      </form>
      </div>
      
    </div>
  );
}
