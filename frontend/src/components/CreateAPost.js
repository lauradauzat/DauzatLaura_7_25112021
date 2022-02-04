
import React, { Component, useState } from 'react'
import axios from 'axios'



//  class CreateAPost extends Component {

   

//     constructor(props) {
//         super(props)
    
//         this.state = {
//             postText: '',  
//             UserId: userId, 
//         }
//     }

   
//     changeHandler = e => {
//         this.setState({[e.target.name]: e.target.value})
//     }

//     submitHandler = e => {
//         e.preventDefault()
//         console.log(this.state)
//         axios.post("http://localhost:3001/posts", this.state)
//             .then(response => {
//                 console.log(response, 'posted'); 
//             })
//             .catch( error => {
//                 console.log(error);
//             })
        
//     }
    
//     render() {
//         const { postText } = this.state; 
   
    
//         return (
//             <div className="NewPost_container">
                
//                  <form onSubmit={this.submitHandler}>
//                  <textarea placeholder="Say Something" name="postText" value={postText} onChange={this.changeHandler}></textarea>
       
                
//                 <button type='submit'>Publier</button>
//                  </form>

//             </div>
//         )
//     }
// }

function CreateAPost ({send, setSend, userId})  {

    const [post, setPost] = useState("");

    
    
    
    const changeHandler = e => {
        setPost(e.target.value); 
        setSend({postText : post,  UserId: userId });
  
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log(post)
        setSend()
        axios.post("http://localhost:3001/posts", send)
            .then(response => {
                console.log(response, 'posted'); 
            })
            .catch( error => {
                console.log(error);
            })
        
        window.location.reload();
     }

    
   
    
        return (
            <div className="NewPost_container">
                
                 <form onSubmit={submitHandler}>
                 <textarea placeholder="Say Something" name="postText" value={post} onChange={changeHandler}></textarea>
       
                
                <button type='submit'>Publier</button>
                 </form>

            </div>
        )
    

}

export default CreateAPost; 
