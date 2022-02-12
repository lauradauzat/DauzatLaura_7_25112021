import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

function TxtContainer(props){

 

            return (
                <>
            
                  <input className="txt-container" value={props.text} readonly={props.readOnly} >
                     {/* <p>{}</p> */}
                 </input> 
                </>
            )

        
    
    
       

    


 
}
  

export default TxtContainer