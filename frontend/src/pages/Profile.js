import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { useParams } from 'react-router-dom'; 
import BannerSmall from "../components/BannerSmall";


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
  
function Profile () {
  console.log('coucou profile page');
  const { id }  = useParams(); 
  let history = useHistory(); 
  const [profile, setProfile] = useState([]); 
  const fetchUrl = 'http://localhost:3001/auth/'+id; 
  const backToFeed = "/";

          useEffect(() => {
            axios.get(fetchUrl).then(res => {
                console.log('profile container res: ' + res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])
    
  const isAdmin = profile.isAdmin; 
  console.log(isAdmin); 

  return (
    <>
    <BannerSmall />
    <div>
      <button onClick={() => {history.push(backToFeed)}} > Retourner au Feed</button>
    </div>
    


    <div>
        Profile : {id}
        <h1> {profile.username}</h1>
        <p> E-mail : {profile.email}</p>
        <p>Profil admin : 
           {isAdmin == '1' &&
           <p> oui </p>} 
           {isAdmin == null &&
           <p> non </p>} 
        </p>
       

        
        <button > Modifier le mot de passe</button>


        
    </div>
    </>
  )
}


export default Profile