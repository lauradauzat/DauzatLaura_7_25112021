
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
        console.log('post ' + post)
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

        
      
        //window.location.reload();
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
                 <textarea placeholder="Say Something" name="postText" onChange={changeHandler}>{post}</textarea>
                 <div className='file-form'>
                     <label>Choisir une image</label>
                     <input type="file" name="file" onChange={handleFile}></input>

                 </div>
       
                
                <button type='submit'>Publier</button>
                 </form>

            </div>
        )
    

}

export default CreateAPost; 
