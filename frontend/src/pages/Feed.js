


import React, { Component, useState } from 'react'
import CreateAPost  from '../components/CreateAPost'
import PostsList from '../components/PostsList'
import Login from './Login'




function Feed() {
   
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
            <CreateAPost />
            
            <PostsList />
            </div>
          )

      }
    
   
}

export default Feed
