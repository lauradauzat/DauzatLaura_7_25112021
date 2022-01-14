import React, {useState, useEffect} from "react";
import axios from "axios";

function CommentairesContainer(props){

    // const fetchUrl = 'http://localhost:3001/comments/' + props.postId; 

    const [comments, setComments] = useState([])
    const fetchUrl = 'http://localhost:3001/comments/'+ props.postId; 

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
        <input placeholder="commentaires"></input>
    
             <ul>
                 {comments.map( comment => (
                     <li key={comment.id}>{comment.commentBody}{comment.PostId}</li>
                 ))}
            </ul> 
        </>
    )

 
}
  

export default CommentairesContainer

