import React, { useState, useEffect } from 'react'
import axios from "axios"; 
import CreateAPost  from '../components/CreateAPost'
import PostsList from '../components/PostsList'
import Login from './Login'
import config from '../config';

function Feed() {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const userConnected = localStorage.getItem('id'); 

    const url =  config.apiUrl+"/posts"; 
    const userIdUrl = config.apiUrl+'/auth/'+userConnected; 
    const access_token = localStorage.getItem('token'); 


        //get the posts 
        useEffect(() => {
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            }).then(res => {
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])
    

        //userConnected Info
        useEffect(() => {
            axios.get(userIdUrl, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            }).then(res => {
                setUser(res.data); 

                
            })
            .catch(err => {
                console.log(err)
            })
        }, [])
    


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
            <CreateAPost posts={posts} setPosts={setPosts}/>
            
            <PostsList posts={posts} setPosts={setPosts} userConnected={userConnected} admin={user.isAdmin} />
            </div>
          )

      }
    
   
}

export default Feed
