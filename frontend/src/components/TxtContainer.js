import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

function TxtContainer(props){

    const [text, setText] = useState(props.text); 
    const [images, setImage] = useState(props.images);
    const [send, setSend] = useState({postText: text, image: images});
    

    const  changeHandler = (e) => {
        setText(e.target.value)
        console.log(text);
        setSend({postText: text, image: images});
    }

    const handleFile = e => {
      console.log(e.target.files, "$$$$$$");
      console.log(e.target.files[0], "$$$$$$");
      setImage(e.target.files[0])
      setSend({postText : text, image: images });
      console.log(send);
  }
  


    const sendModifiedText = (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('token');
        console.log(send); 
        setImage();
        setImage();
        setSend();
        const dataArray = new FormData();
        dataArray.append('postText', text); 
        //dataArray.append('UserId', userId); 
        dataArray.append('image', images);
        console.log('datatarray: ' + dataArray);
       
        
        //dataArray.append(json); 
        axios.put("http://localhost:3001/posts/"+props.postId,  dataArray, {
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
  
              if (props.displayInputs === props.postId ) {
                
                return    <div> 
                    <form onSubmit={sendModifiedText}>
                      <input className="txt-container"  placeholder={props.text} name="postText" value={text} onChange={changeHandler}></input>
                        <div className='file-form'>
                            <label>Choisir une image</label>
                            <input type="file" name="file" onChange={handleFile}></input>
                         </div>
                      <button type='submit'>Confirmer les modifications</button>
                    </form>
                  </div>
              } 
              else 
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