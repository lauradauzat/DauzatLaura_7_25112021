
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
        console.log('goes into modify ');
    
            setDisplay(postId); 
            console.log(displayInputs);
    


        // axios.put(`http://localhost:3001/posts/${e}`)  
        // .then(response => {
        //     console.log(response, 'modified');    
        // })
        // .catch( error => {
        //     console.log(error);
        // })
    }

    

    // console.log('usercon' +props.userConnected); 
    // console.log('is admin ??? ' + props.admin);
   
    

    return (
        <>
       
        <div className="feed-container">
        {
            
                    props.posts.slice(0).reverse().map((post) => (
                      
                    <>

                    <div className="postcard" key = {post.id }>
                        
                        <div className="up-container">
                        <ProfileContainer  userId={post.UserId}></ProfileContainer>
                         <TxtContainer postId={post.id} text={post.postText} displayInputs={displayInputs} ></TxtContainer>
                        </div>
                        
                         <ImgContainer imageRef={post.image}></ImgContainer>
                        
          
                        
                         
                        {/* <ol key = { post.id } >
                           
                            Username: { post.UserId}, 
                            PostId : {post.id}, 
                            imageUrl: {post.image}
                            Post: { post.postText },
                        </ol> */}

                        <CommentairesContainer postId={post.id} admin={admin} ></CommentairesContainer>
                        <div>
                 

                        {(function() {
                                if (props.userConnected == post.UserId) {
                                    return    <div><button onClick={() => { deletePost(post.id)}}> X</button> <button  onClick={() => { modifyDisplay(post.id)}}> Modifier </button></div>
                                } else if (admin) {
                                    return <div> <button onClick={() => { deletePost(post.id)}}> X</button></div>
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


