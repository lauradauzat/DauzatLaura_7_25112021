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
        <div >
            <button type="button" className='logOut' onClick={logOutandReload}>Me déconnecter</button>
        </div>
         
         )
    
   
}

export default LogoutBtn
