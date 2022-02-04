


import React, { Component, useState } from 'react'
import CreateAPost  from '../components/CreateAPost'
import PostsList from '../components/PostsList'
import Login from './Login'




function Feed() {
   
    const userId = localStorage.getItem('id');
    const [send, setSend] = useState({postText: '',  UserId: userId,});

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
            <CreateAPost send={send} setSend={setSend} userId={userId} />
            
            <PostsList />
            </div>
          )

      }
    
   
}

export default Feed
