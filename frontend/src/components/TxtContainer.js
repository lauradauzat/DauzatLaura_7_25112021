import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

function TxtContainer(props){

    const [text, setText] = useState(props.text); 
    const [json, setJson] = useState([{"postText": text}]);
    

    const  changeHandler = e => {
        setText(e.target.value)
        console.log(text);
        setJson({"postText": text});
    }

    const sendModifiedText = e => {
        e.preventDefault();
    
        console.log(json); 
        const dataArray = new FormData();
        const access_token = localStorage.getItem('token')
        dataArray.append(json); 
        axios.put("http://localhost:3001/posts/"+props.postId,  json, {
          headers: {
              'Authorization': `token ${access_token}`, 
              "Content-Type": "multipart/form-data"
          }
      })
  
            .then(response => {
                console.log(response, 'posted'); 
            
                
            })
            .catch( error => {
                console.log(error);
            })
      }
    
  

            return (
                <>
            {
                            (function() {
  
              if (props.displayInputs === true ) {
                
                return    <div> 
                    <form onSubmit={sendModifiedText}>
                      <input className="txt-container"  placeholder={props.text} name="postText" value={text} onChange={changeHandler}></input>
     
                      <button type='submit'>Confirmer les modifications</button>
                    </form>
                  </div>
              } 
              else if (props.displayInputs === false)
              {
           
                return (
                  <>
              
                    <p className="txt-container"  >{props.text} 
                   </p> 
                  </>
              )
  
              }
            })()
            }
               
                </>
            )

        
    
    
       

    


 
}
  

export default TxtContainer