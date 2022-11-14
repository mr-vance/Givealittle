import React, { useContext } from "react";
import HomeNavBar from "../components/HomeNavBar";
import Navigation from "../components/HomeNavBar";
import { NameContext, LoginContext, CartContext } from "../Context";
import ContactCard from "../components/ContactCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomeAbout() {
  const { name, setName } = useContext(NameContext);

  const today = new Date();

  const [contacts, setContacts] = useState([
    {
      name: "Brian Makhubele",
      email: "2113525@students.wits.ac.za",
      color: "#FAEBD7",
    },
    {
      name: "Motheo Tsirwe",
      email: "2329751@students.wits.ac.za",
      color: "#D4CFB4",
    },
    {
      name: "Thulasizwe Sabela",
      email: "2140615@students.wits.ac.za",
      color: "#ABB596",
    },
    {
      name: "Aubrey Nalane",
      email: "2167773@students.wits.ac.za",
      color: "#7F9C7E",
    },
    {
      name: "Zukisa Moto",
      email: "2340955@students.wits.ac.za",
      color: "#50836C",
    },
    {
      name: "Tshepiso Mahoko",
      email: "2352695@students.wits.ac.za",
      color: "#FAEBD7",
    },
    {
      name: "Pamela Segana",
      email: "2265335@students.wits.ac.za",
      color: "#9DBCB1",
    },
    {
      name: "Tiisetso Mojalefa",
      email: "2369718@students.wits.ac.za",
      color: "#80cbc4",
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      exit={({ opacity: 0 }, { duration: 0.5 })}
    >
      <HomeNavBar />
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <h3 className="about_details">About Us</h3>
      <br />
      <h6 style={{marginLeft: "10%", marginRight: "10%"}}>
        GiveALittle is an Online MarketPlace similar to takealot for both Buyers
        and Sellers which allows them to buy products or goods they need online
        OR sell the items they want to sell, meaning they can be both a buyer
        and the seller at the same time.
      </h6>
      <br />
      <h2 style={{ display: "flex", justifyContent: "center" }}>Developers</h2>
      <div className="all-contacts-container">
        {contacts.map((contact, index) => {
          return (
            <ContactCard
              key={index}
              name={contact.name}
              email={contact.email}
              color={contact.color}
            />
          );
        })}
      </div>
      </div>
    </motion.div>
  );
}
