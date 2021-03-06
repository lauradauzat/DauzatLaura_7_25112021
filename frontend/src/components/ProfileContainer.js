import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import DayJS from 'react-dayjs';


function ProfileContainer(props){

    let history = useHistory(); 
    const [profile, setProfile] = useState([]); 
    const access_token = localStorage.getItem('token');

    
        const fetchUrl = 'http://localhost:3001/auth/'+ props.userId; 

        useEffect(() => {
            axios.get(fetchUrl, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            }).then(res => {
               // console.log('profile container res: ' + res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])


        if (props.userId == null) {
            return(
                <p> No User affiliated</p>
            )
        } else {

            const fetchProfilePage = '/profile/'+profile.id ; 
          //  console.log(profile); 
            const date = props.createdAt; 

            

            return (
                <>
                <div className="authorName-container" >
                    <button className="authorName" onClick={() => {history.push(fetchProfilePage)}}> {profile.username}</button>
                    <DayJS  className="dayJs" format="DD-MM-YYYY">{ date }</DayJS>
                    
                    
                </div>
                   
                </>
            )

        }

}
  

export default ProfileContainer