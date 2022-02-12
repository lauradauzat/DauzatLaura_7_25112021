import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { useParams } from 'react-router-dom'; 
import BannerSmall from "../components/BannerSmall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";






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

  const userConnected = localStorage.getItem('id'); 

  const modifyUsername = (e) => {
    console.log('goes into modifu username funciton');
  }


  const modifyEmail = (e) => {
    console.log('goes into modify email funciton');
  }

  const modifyAdmin = (e) => {
    console.log('goes into modify admin funciton');
  }

  const modifyPassword = (e) => {
    console.log('goes into modify pass funciton');
  }

  const deleteProfile = (e) => {
    console.log('goes into delete profile funciton');

    const confirm = window.confirm('Êtes vous sur.e de vouloir supprimer ce profil ? ');
    if (confirm) {
          axios.delete('http://localhost:3001/auth/'+id)
          .then(res => {
            localStorage.clear();
            console.log('deleted successfully')
        
        })
        .catch(err => {
            console.log(err)
        })
    }
  }



  return (
    <>
    <BannerSmall />
    {/* <div>
      <button onClick={() => {history.push(backToFeed)}} > Retourner au Feed</button>
    </div>
     */}


    <div>
        Profile : {id}
        <div>
          <h1> {profile.username}</h1>
         
          {(function() {
          if (userConnected == id) {
            return    <div> <button  onClick={() => { modifyUsername()}}>  <FontAwesomeIcon icon={faEdit} /></button></div>
          } 
        })()}
        </div>

    
      
        <div>   
           <p> E-mail : {profile.email}</p>

           {(function() {
          if (userConnected == id) {
            return    <div> <button  onClick={() => { modifyEmail()}}>  <FontAwesomeIcon icon={faEdit} /></button></div>
          } 
        })()}
       
        </div>

    
        
        <p>Profil admin : 

           {isAdmin == '1' &&
           <p> oui </p>} 
           {isAdmin == null &&
           <p> non </p>} 

          {(function() {
                    if (userConnected == id) {
                      return    <div> <button  onClick={() => { modifyAdmin()}}>  <FontAwesomeIcon icon={faEdit} /></button></div>
                    } 
          })()}
              
        </p>
       

        {(function() {
          if (userConnected == id) {
            return    <div> 
              <button  onClick={() => { modifyPassword()}}> Modifier le mot de passe <FontAwesomeIcon icon={faEdit} /></button>
              <button  onClick={() => { deleteProfile()}}> Supprimer le profil<FontAwesomeIcon icon={faTrash} /> </button>

            </div>
          } 
        })()}


        
    </div>
    </>
  )
}


export default Profile