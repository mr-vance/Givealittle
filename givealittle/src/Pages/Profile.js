import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase-config'; 
import Navigation from '../components/Navigation';
import { NameContext } from '../Context';
import SellerDetails from '../components/SellerDetails';
import '../components/SellersPage.css'


function Profile() {

    const {name, setName} = useContext(NameContext);
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(collection(db, "Users"));
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers()
    }, []);

  return (
    <div>
        <Navigation/>
        {Users.map((user, idx) => (
         user.Email == name
        ? (
            <div key={idx} className='profile-details-container'>
                <h1 className='detail'>Name: <span className='detail-bg'>{user.Name}</span></h1>
                <h1 className='detail'>Email: <span className='detail-bg'>{user.Email}</span></h1>
                <h1 className='detail'>Cell: <span className='detail-bg'>{user.Cell}</span></h1>
            </div>
        )
        : null
        ))}
    </div>
  )
}

export default Profile