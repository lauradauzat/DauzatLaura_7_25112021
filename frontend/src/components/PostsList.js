
import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { useHistory  } from "react-router-dom";
import './App';
import CommentairesContainer from "./CommentairesContainer";
import ImgContainer from "./ImgContainer";
import ProfileContainer from "./ProfileContainer";
import TxtContainer from "./TxtContainer"; 


// class PostsList extends React.Component {

//     // Constructor 
//     constructor(props) {
//         super(props);
   
//         this.state = {
//             items: [],
//             DataisLoaded: false
//         };
//     }



   
//     // ComponentDidMount is used to
//     // execute the code 
//     componentDidMount() {
//         fetch(
//         "http://localhost:3001/posts")
//             .then((res) => res.json(console.log(res)))
//             .then((json) => {
//                 this.setState({
//                     items: json,
//                     DataisLoaded: true
//                 });
               
//             })

            
    

//     render() {
        
        
//         const { DataisLoaded, items } = this.state;
       
//         if (!DataisLoaded) return <div>
//             <h1> Chargement en cours.... </h1> </div> ;

//         return (
          
//             <div className = "Post-container">
//                 <h1> Salut {userLoggedIn} </h1>
              
//                   {
//                     items.map((item) => (
                      
//                     <>
//                          <ImgContainer imageRef={item.image}></ImgContainer>
//                          <ProfileContainer  userId={item.UserId}></ProfileContainer>
                         
//                         <ol key = { item.id } >
                           
//                             Username: { item.UserId}, 
//                             PostId : {item.id}, 
//                             imageUrl: {item.image}
//                             Post: { item.postText },
//                         </ol>

//                         <CommentairesContainer postId={item.id}></CommentairesContainer>
                        
//                     </>    
                    
//                     ))
//                 }
//             </div>
//          );
//     }

 




//  }


function PostsList(props) {

    let history = useHistory(); 
    const [readOnly, changeReadOnly] = useState("readonly"); 

    const deletePost = (e) => {
        axios.delete(`http://localhost:3001/posts/${e}`)  
        .then(response => {
            console.log(response, 'deleted');    
        })
        .catch( error => {
            console.log(error);
        })
    }


    const modifyPost = (e, readOnly) => {
        console.log('goes into modify ');
        console.log(readOnly);
        
        
        changeReadOnly(undefined);
        console.log(readOnly);

        // axios.put(`http://localhost:3001/posts/${e}`)  
        // .then(response => {
        //     console.log(response, 'modified');    
        // })
        // .catch( error => {
        //     console.log(error);
        // })
    }

    console.log('usercon' +props.userConnected); 
   
    

    return (
        <>
       
        <div className="feed-container">
        {
            
                    props.posts.slice(0).reverse().map((post) => (
                      
                    <>

                    <div className="postcard">
                        
                        <div className="up-container">
                        <ProfileContainer  userId={post.UserId}></ProfileContainer>
                         <TxtContainer text={post.postText} readOnly={readOnly}></TxtContainer>
                        </div>
                        
                         <ImgContainer imageRef={post.image}></ImgContainer>
                        
          
                        
                         
                        {/* <ol key = { post.id } >
                           
                            Username: { post.UserId}, 
                            PostId : {post.id}, 
                            imageUrl: {post.image}
                            Post: { post.postText },
                        </ol> */}

                        <CommentairesContainer postId={post.id}></CommentairesContainer>
                        <div>
                 

                        {(function() {
                                if (props.userConnected == post.UserId) {
                                    return    <div><button onClick={() => { deletePost(post.id)}}> Supprimer</button> <button  onClick={() => { modifyPost(post.id, readOnly)}}> Modifier </button></div>
                                } 
                                })()}

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


