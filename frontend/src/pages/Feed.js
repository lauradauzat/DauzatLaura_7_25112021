


import React, { Component } from 'react'
import CreateAPost  from '../components/CreateAPost'
import PostsList from '../components/PostsList'
import Login from './Login'



function Feed() {


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
