

import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { useHistory  } from "react-router-dom";
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Banner from '../components/Banner'
import LogoutBtn from '../components/LogoutBtn'
import BannerSmall from '../components/BannerSmall'

function Login() {

    const userConnected = localStorage.getItem('id'); 
    const userIdUrl = 'http://localhost:3001/auth/'+userConnected; 
    const [user, getUser] = useState([])

    useEffect(() => {
        axios.get(userIdUrl).then(res => {
            getUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    if (localStorage.getItem("token") === null) {
        return (
            <div className="login">
                <Banner />
                <SignIn />
                <button> Créer un nouveau compte</button>
                <SignUp />
                
            </div>
             
             )
      } else {


    

          return (
            <div className="logout">
            <BannerSmall />
            <div className='Hello'><p>Bonjour, {user.username}</p></div>
            <LogoutBtn/>
            </div>
          )

      }
    
   
}

export default Login
