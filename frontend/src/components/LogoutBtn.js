import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function logOutandReload(e){

}

function LogoutBtn(props) {
    const logOutandReload = (e) => {
        e.preventDefault(); 
        localStorage.clear(); 
        window.location.reload(); 
    }

    const routeToMyProfile = props.routeToMyProfile;
  
    return (
        <div >
            <button onClick={routeToMyProfile}> <FontAwesomeIcon icon={faUser} /> </button>
            <button type="button" className='logOut' onClick={logOutandReload}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
        </div>
         
         )
    
   
}

export default LogoutBtn
