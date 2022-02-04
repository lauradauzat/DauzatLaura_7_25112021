import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 

function ProfileContainer(props){

    let history = useHistory(); 
    const [profile, setProfile] = useState([])

    
        const fetchUrl = 'http://localhost:3001/auth/'+ props.userId; 

        useEffect(() => {
            axios.get(fetchUrl).then(res => {
                console.log('profile container res: ' + res)
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
            console.log(profile); 

            return (
                <>
                <div className="authorName-container" >
                    <button className="authorName" onClick={() => {history.push(fetchProfilePage)}}> {profile.username}</button>
                </div>
                   
                </>
            )

        }
    
    
       

    


 
}
  

export default ProfileContainer