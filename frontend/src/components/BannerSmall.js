import logo from "../images/icon-above-font.png"
import React from "react";
import { useHistory } from "react-router-dom"; 


function BannerSmall() {

    const backToFeed = "/";
    let history = useHistory(); 

    return (
        <div className="bannerSmall">
            <img  onClick={() => {history.push(backToFeed)}}  src={logo} alt="logo"></img>
        </div>
         
         )
    
   
}

export default BannerSmall