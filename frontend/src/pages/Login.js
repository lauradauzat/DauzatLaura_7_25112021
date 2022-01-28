

import React, { Component } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Banner from '../components/Banner'
import LogoutBtn from '../components/LogoutBtn'

function Login() {
    if (localStorage.getItem("token") === null) {
        return (
            <div className="login">
                <Banner />
                <SignUp />
                <SignIn />
            </div>
             
             )
      } else {
          return (
            <div className="login">
            
            <LogoutBtn/>
            </div>
          )

      }
    
   
}

export default Login
