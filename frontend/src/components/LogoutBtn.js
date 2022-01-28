import React, { Component } from 'react'
function logOutandReload(e){
    console.log("coucou  ");

}

function LogoutBtn() {
    const logOutandReload = (e) => {
        e.preventDefault(); 
        localStorage.clear(); 
        window.location.reload(); 
    }
  
    return (
        <div className="logOut">
            <button onClick={logOutandReload}>Me déconnecter</button>
        </div>
         
         )
    
   
}

export default LogoutBtn
