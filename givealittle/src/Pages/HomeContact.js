import Navigation from "../components/HomeNavBar";
import HomeNavBar from "../components/HomeNavBar";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function HomeContact() {
  const form = useRef();

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
      <HomeNavBar />
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
          />
          <br/>
          <input
            className="contact-input"
            type="email"
            name="user_email"
            placeholder="Enter Your Email"
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
