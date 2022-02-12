import React, {useState, useEffect} from "react";
import axios from "axios";
import ProfileContainer from "./ProfileContainer";

function CommentairesContainer(props){

    // const fetchUrl = 'http://localhost:3001/comments/' + props.postId; 

    const [comments, setComments] = useState([])
    const fetchUrl = 'http://localhost:3001/comments/'+ props.postId; 
    const userConnected = localStorage.getItem('id'); 
    const postCommentUrl = 'http://localhost:3001/comments' ;

//deleteComment
    const deletePost = (e) => {
        axios.delete(`http://localhost:3001/comments/${e}`)  
        .then(response => {
            console.log(response, 'deleted');    
        })
        .catch( error => {
            console.log(error);
        })
    }


    const modifyPost = (e) => {
        console.log('goes into modify ');


        // axios.put(`http://localhost:3001/comments/${e}`)  
        // .then(response => {
        //     console.log(response, 'modified');    
        // })
        // .catch( error => {
        //     console.log(error);
        // })
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
        
        axios.post(postCommentUrl, newComment).then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        }) 


    }

  
    useEffect(() => {
        axios.get(fetchUrl).then(res => {
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
            <textarea placeholder="commentaires" value={newCommentText} onChange={ (e) => {  setNewCommentText(e.target.value); setNewComment({commentBody : e.target.value, 
            PostId: props.postId, 
            UserId: userConnected}) }} > </textarea>
            <button> Envoyer un commentaire </button>
        </form>

        <div className="commentsSection">

             {comments.map( comment => (
                     <div className="com" key={comment.id}>
                         <ProfileContainer userId={comment.UserId}/>
                         <div className="commentText">{comment.commentBody}</div>
                         {(function() {
                                if (userConnected == comment.UserId) {
                                    return    <div><button onClick={() => { deletePost(comment.id)}}> Supprimer</button> <button  onClick={() => { modifyPost(comment.id)}}> Modifier </button></div>
                                } 
                                })()}

                     </div>
             ))}

        </div>

      
       
    
           
        </>
    )

 
}
  

export default CommentairesContainer

