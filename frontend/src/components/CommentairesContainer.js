import React, {useState, useEffect} from "react";
import axios from "axios";
import ProfileContainer from "./ProfileContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";



function CommentairesContainer(props){

    //const fetchUrl = 'http://localhost:3001/comments/' + props.postId; 

    const [comments, setComments] = useState([])
    const fetchUrl = 'http://localhost:3001/comments/'+ props.postId; 
    const userConnected = localStorage.getItem('id'); 
    const postCommentUrl = 'http://localhost:3001/comments' ;
   
    const access_token = localStorage.getItem('token'); 
    const { admin } = props; 
    const [inputComment, setInputComment] = useState(0); 
    const [modifiedComment, setModifiedComment] = useState("");
    const [sendCom, setSendCom] = useState({
        commentBody: modifiedComment
    }) 

   

//deleteComment
    const deletePost = (e) => {
        axios.delete(`http://localhost:3001/comments/${e}`, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })  
        .then(res => {
            console.log(res, 'deleted');  
            setComments(comments.filter((comment) => comment.id !== e));  
        })
        .catch( error => {
            console.log(error);
        })
    }


    const modifyPost = (commentId) => {
        //console.log('goes into modify ');
        setInputComment(commentId); 
        //console.log('dieeeeeeeeeees' + inputComment);
    
    }

    const  changeHandler = (e) => {
       setModifiedComment(e.target.value);
      
       setSendCom({
        commentBody: modifiedComment
        });
       //console.log(sendCom);
  
    }

    const  submitModifiedCommentHandler = (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('token');
        const commentId = e.currentTarget.getAttribute("commentId"); 
        const modifyCommentUrl = 'http://localhost:3001/comments/'+commentId; 
    
        // console.log('url ' +  modifyCommentUrl);
        // console.log('submit handler clicked')
    
        setSendCom({commentBody : modifiedComment});
        console.log ('sendcom   = ' + sendCom); 
       
        axios.put(modifyCommentUrl, sendCom, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })  
        .then(res => {
            //console.log(res, 'modified'); 
            let tmpComments = [...comments];
            //console.log('tmp :' + tmpComments); 
            //console.log('res.data : ' + res.data); 
            // let newComment = res.data; 
            // tmpComments.push(res.data); 
            //  setComments(tmpComments); 
            setInputComment(0);
        
        })
        .catch( error => {
            console.log(error);
        })

    }



    const [newComment, setNewComment] = useState({
        'commentBody': "", 
        'PostId': props.postId, 
        'UserId': userConnected
    }) 
    
    const [newCommentText, setNewCommentText] = useState("");

    const postComment = (e) => {
        e.preventDefault();
        setNewComment({commentBody : newCommentText, 
            PostId: props.postId, 
            UserId: userConnected})
        console.log(newComment); 
        
        axios.post(postCommentUrl, newComment, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        }).then(res => {
            console.log(res); 
            let tmpComments = [...comments];
            tmpComments.push(res.data); 
            setComments(tmpComments); 
        })
        .catch(err => {
            console.log(err)
        }) 


    }

  
    useEffect(() => {
        axios.get(fetchUrl, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        }).then(res => {
            console.log(res)
            setComments(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


    return (
        <>
          
        <form onSubmit={postComment} className="com-container">
            <ProfileContainer  userId={userConnected}></ProfileContainer>
            <textarea placeholder="Ecrire un nouveau commentaire ..." value={newCommentText} onChange={ (e) => {  setNewCommentText(e.target.value); setNewComment({commentBody : e.target.value, 
            PostId: props.postId, 
            UserId: userConnected}) }} > </textarea>
            <button><FontAwesomeIcon icon={faPaperPlane}/> </button>
        </form>

        <div className="commentsSection">

             {comments.map( comment => (
                     <div className="com" key={comment.id}>
                         <ProfileContainer userId={comment.UserId}/>

                         
                         {
                                (function() {
    
                                if (inputComment === comment.id ) {
                            
                                return    <div className="newcom-container"> 
                                
                                <form onSubmit={submitModifiedCommentHandler} commentId={comment.id}>
                                <input className="com-container"  placeholder={comment.commentBody} name="commentText" value={modifiedComment} onChange={changeHandler} ></input>
                                   
                                <button type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
                                </form>
                                </div>
                            

                                  }   else {
                                        return ( <><div className="commentText">{comment.commentBody}</div></>)
                                       
                                    
                                }   
                                })()
                        }
                            
                            {(function() {
                                            if ((userConnected == comment.UserId) && (inputComment != comment.id )) {
                                                return    <div className="com-buttons-container"><button onClick={() => { deletePost(comment.id)}}> <FontAwesomeIcon icon={faTrash}/> </button> <button  onClick={() => { modifyPost(comment.id)}}> <FontAwesomeIcon icon={faEdit}/>  </button></div>
                                            } else if (admin  && (inputComment != comment.id )) {
                                                return    <div className="com-buttons-container"><button onClick={() => { deletePost(comment.id)}}> <FontAwesomeIcon icon={faTrash}/>  </button></div>
                                            }
                                            })()}
                                                  
                            
                            
                         
                         
                       

                     </div>
             ))}

        </div>

      
       
    
           
        </>
    )

 
}
  

export default CommentairesContainer

