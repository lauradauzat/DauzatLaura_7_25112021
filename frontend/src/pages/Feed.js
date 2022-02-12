


import React, { Component, useState, useEffect } from 'react'
import axios from "axios"; 
import CreateAPost  from '../components/CreateAPost'
import PostsList from '../components/PostsList'
import Login from './Login'




function Feed() {

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
    
   
    // const userId = localStorage.getItem('id');
    // const [send, setSend] = useState({postText: '',  UserId: userId, image: null});
    // send={send} setSend={setSend} userId={userId} 

    if (localStorage.getItem("token") === null) {
        return (
            <div>
                 <Login />
            </div>
           
             
             )
      } else {
          return (
            <div className="feed">
            <Login />
            <CreateAPost posts={posts}/>
            
            <PostsList posts={posts} userConnected={userConnected} />
            </div>
          )

      }
    
   
}

export default Feed
