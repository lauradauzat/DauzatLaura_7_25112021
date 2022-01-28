
import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { useHistory  } from "react-router-dom";
import './App';
import CommentairesContainer from "./CommentairesContainer";
import ImgContainer from "./ImgContainer";
import ProfileContainer from "./ProfileContainer";


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
    const [posts, getPosts] = useState([])
    const [user, getUser] = useState([])
    const userConnected = localStorage.getItem('id'); 

    const url =  "http://localhost:3001/posts"; 
    const userIdUrl = 'http://localhost:3001/auth/'+userConnected; 

    
    
    //get the posts 
    useEffect(() => {
        axios.get(url).then(res => {
            getPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios.get(userIdUrl).then(res => {
            getUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
        <p>Coucou {user.username}</p>
        {
                    posts.map((post) => (
                      
                    <>
                         <ImgContainer imageRef={post.image}></ImgContainer>
                         <ProfileContainer  userId={post.UserId}></ProfileContainer>
                         
                        <ol key = { post.id } >
                           
                            Username: { post.UserId}, 
                            PostId : {post.id}, 
                            imageUrl: {post.image}
                            Post: { post.postText },
                        </ol>

                        <CommentairesContainer postId={post.id}></CommentairesContainer>
                        
                    </>    
                    
                    ))
        }

     
        </>
    )
}

export default PostsList;


