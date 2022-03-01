import React, {useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import config from "../config"; 


function TxtContainer(props){

    const [text, setText] = useState(props.text); 
     const [images, setImage] = useState(props.images);
    const [send, setSend] = useState({postText: text});
    let { posts, setPosts } = props;
    
    
//handle the modification of a post
    const  changeHandler = (e) => {
        setText(e.target.value)
       // console.log(text);
        setSend({postText: text});
    }

    const handleFile = e => {
      // console.log(e.target.files, "$$$$$$");
      // console.log(e.target.files[0], "$$$$$$");
      setImage(e.target.files[0])
      setSend({postText : text, image: images });
      //console.log(send);
  }
  
    const sendModifiedText = (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('token');
       // console.log(send); 
        setImage();
        setSend();
        const dataArray = new FormData();
        dataArray.append('postText', text); 
        dataArray.append('image', images);
        //console.log('datatarray: ' + dataArray);
        const urlSendModify = config.apiUrl+"/posts/"+props.postId; 
        //console.log('url' + urlSendModify)
        axios.put(urlSendModify,  dataArray, {
          headers: {
              'Authorization': `token ${access_token}`, 
              "Content-Type": "multipart/form-data"
          }
      })
      .then(response => {
        //console.log(  response.data, 'posted'); 
        const newPosts = [...posts];  
        const mPost = newPosts.find(item => item.id == response.data.post.id); 
       
        // console.log('--------------------');
        // console.log(response.data); 
        // console.log(mPost);
        // console.log('--------------------');
        mPost.postText = response.data.post.postText;
        mPost.image = response.data.post.image;  
        setPosts(newPosts);
        props.setDisplay(0); 
        setText(text);     
      })
      .catch( error => {
        console.log(error);
      })
    }
  

    //JSX

            return (
                <>
            {
                            (function() {
  
              if (props.displayInputs === props.postId ) {
                
                return    <div className="form-container"> 
                    <form onSubmit={sendModifiedText}>
                      <input className="txt-container"  placeholder={props.text} name="postText" value={text} onChange={changeHandler}></input>
                       <div className="container">
                          <div className='file-form'>
                                <input type="file" name="file" onChange={handleFile}></input>
                            </div> 
                          <button type='submit'>Modifier <FontAwesomeIcon icon={faPaperPlane} /></button>
                       </div>
                      
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