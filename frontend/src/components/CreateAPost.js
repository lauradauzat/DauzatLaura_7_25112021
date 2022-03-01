
import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


function CreateAPost (props)  {
    const userId = localStorage.getItem('id');
    const [post, setPost] = useState("");
    const [images, setImage] = useState(null);
    const [send, setSend] = useState({postText: post,  UserId: userId, image: images});
    const postArray = props.posts;
    const setPosts = props.setPosts;
    
    
    const changeHandler = e => {
        setPost(e.target.value); 
        setSend({postText : post,  UserId: userId, image: images });
  
    }

    const submitHandler = (e)  => {
        e.preventDefault()
        //console.log('post ' + post)
        setSend()
        const access_token = localStorage.getItem('token'); 
        const dataArray = new FormData();
        dataArray.append('postText', post); 
        dataArray.append('UserId', userId); 
        dataArray.append('image', images);

        if ((post == "") && (images == null)) {

            alert('Oups, il semble que vous essayez de publier un post vide !');

        } else {
           
            console.log( 'send = ' + dataArray);
            axios.post("http://localhost:3001/posts",  dataArray, {
                headers: {
                  "Content-Type": "multipart/form-data", 
                  'Authorization': `token ${access_token}`
                }
              })
                .then(response => {
                    console.log(response, 'posted'); 
                    let tmpPosts = [...postArray];
                    tmpPosts.push(response.data); 
                    setPosts(tmpPosts);                              
                    
                })
                .catch( error => {
                    console.log(error);
                })
        }

 
     }


    const handleFile = e => {
        console.log(e.target.files, "$$$$$$");
        console.log(e.target.files[0], "$$$$$$");
        setImage(e.target.files[0])
        setSend({postText : post,  UserId: userId, image: images });
        console.log(send);
    }
    
   
    
        return (
            <div className="NewPost_container">
                
                 <form  onSubmit={submitHandler} encType="form-multipart">
                 <textarea placeholder="Dites-quelque chose ... " name="postText" onChange={changeHandler} defaultValue={post}></textarea>
                 <div className='file-form'>
                     <input type="file" name="file" onChange={handleFile}></input>
                     <button type='submit'>Publier <FontAwesomeIcon icon={faPaperPlane} /></button>
                 </div>
                 </form>

            </div>
        )
    

}

export default CreateAPost; 
