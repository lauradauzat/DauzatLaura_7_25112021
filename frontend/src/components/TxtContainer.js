import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

function TxtContainer(props){

 

            return (
                <>
            
                  <div className="txt-container">
                     <p>{props.text}</p>
                 </div> 
                </>
            )

        
    
    
       

    


 
}
  

export default TxtContainer