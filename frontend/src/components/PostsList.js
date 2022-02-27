
import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { useHistory  } from "react-router-dom";
import './App';
import CommentairesContainer from "./CommentairesContainer";
import ImgContainer from "./ImgContainer";
import ProfileContainer from "./ProfileContainer";
import TxtContainer from "./TxtContainer"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function PostsList(props) {
    
    const [displayInputs, setDisplay] = useState(0); 
    const access_token = localStorage.getItem('token'); 
    let { admin, posts, setPosts } = props;


    const deletePost = (e) => {
        axios.delete(`http://localhost:3001/posts/${e}`, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })  
        .then(response => {
            console.log(response, 'deleted');
            setPosts(posts.filter((post) => post.id !== e));
        })
        .catch( error => {
            console.log(error);
        })
    }
 
  

    const modifyDisplay = (postId) => {
        setDisplay(postId); 
    }

     const [image, setImage] = useState();
     const [send, setSend] = useState({image: image});

    const handleFile = (e)=> {
      //console.log(e.target.files, "$$$$$$");
      //console.log(e.target.files[0], "$$$$$$");
      setImage(e.target.files[0])
      setSend({image: image });
      //console.log(send);
     }

     const sendModifiedPhoto = (e) => {
         e.preventDefault(); 
         setSend();
         const access_token = localStorage.getItem('token'); 
         const dataArray = new FormData();
         dataArray.append('image', image);
         axios.put(`http://localhost:3001/posts/${e}`,  dataArray, {
            headers: {
              "Content-Type": "multipart/form-data", 
              'Authorization': `token ${access_token}`
            }
          })
            .then(response => {
                console.log(response, 'posted'); 
                let tmpPosts = [...posts];
                tmpPosts.push(response.data); 
                setPosts(tmpPosts); 
                
                
            })
            .catch( error => {
                console.log(error);
            })
  
         
     }

    return (
        <>
       
        <div className="feed-container">
        {  
            props.posts.slice(0).reverse().map((post) => (          
             <>

                <div className="postcard" key = {post.id }>

                    <div className="main-up-container">
                        <div className="up-container">
                            <ProfileContainer  userId={post.UserId}></ProfileContainer>
                            <TxtContainer postId={post.id} text={post.postText} displayInputs={displayInputs} setDisplay={setDisplay} ></TxtContainer>
                        </div>
                        <div className="delete-and-modify-container">
                            {(function() {
                            if (props.userConnected == post.UserId) {
                                return  <div>
                                            <button onClick={() => { deletePost(post.id)}}> <FontAwesomeIcon icon={faTrash}/> </button> 
                                            <button  onClick={() => { modifyDisplay(post.id)}}> <FontAwesomeIcon icon={faEdit}/> </button> 
                                                {/* {displayInputs===post.id 
                                                &&  
                                                <form onSubmit={sendModifiedPhoto}>
                                                <div className='file-form'>
                                                        <label>Choisir une image</label>
                                                        <input type="file" name="file" onChange={handleFile}></input>
                                                </div>
                                                <button type='submit'>Confirmer les modifications</button>
                                                </form>
                                                } */}
                                        </div>
                            } else if (admin) {
                                return <div> <button onClick={() => { deletePost(post.id)}}> <FontAwesomeIcon icon={faTrash}/></button></div>
                            }
                            })()}
                        </div>
                    </div>

                     
                            
                    <ImgContainer imageRef={post.image}></ImgContainer>
                            
                    <CommentairesContainer postId={post.id} admin={admin} ></CommentairesContainer>
                
                
                 <div>

                   

                     </div>
                  
                        
                  
                    </div>
                         
                        
                    </>    
                    
                    ))
        }
        </div>

     
        </>
    )
}

export default PostsList;


