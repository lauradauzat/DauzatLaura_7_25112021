import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { useParams } from 'react-router-dom'; 

// function Profile(props){

//     let history = useHistory(); 
//     const user  = useParams();   
//      console.log(user); 

//     const [profile, setProfile] = useState([])

    
//         const fetchUrl = 'http://localhost:3001/auth/'+user; 

//         useEffect(() => {
//             axios.get(fetchUrl).then(res => {
//                 console.log('profile container res: ' + res)
//                 setProfile(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         }, [])


//         if (user == null) {
//             return(
//                 <p> No User affiliated</p>
//             )
//         } else {

//             const fetchProfilePage = '/profile/'+profile.userId ; 

//             return (
//                 <>
            
//                     <p> Post from : {profile.username}</p>
//                     <button onClick={() => {history.push('/profile')}}> Go to profile page </button>
//                 </>
//             )

//         }
    
    
       

    


 
// }
  
const Profile = () => {
  console.log('coucou profile page');
  const { id }  = useParams(); 
  let history = useHistory(); 
  const [profile, setProfile] = useState([]); 
  const fetchUrl = 'http://localhost:3001/auth/'+id; 

          useEffect(() => {
            axios.get(fetchUrl).then(res => {
                console.log('profile container res: ' + res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])

  return (
    <>
    <div>
        Profile : {id}
        <p> This is {profile.username}'s profile</p>
        <p> eMail : {profile.email}</p>
    </div>
    </>
  )
}


export default Profile