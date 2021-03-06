import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { useParams } from 'react-router-dom'; 
import BannerSmall from "../components/BannerSmall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../config";


function Profile () {
  const { id }  = useParams(); 
  let history = useHistory(); 
  const [profile, setProfile] = useState([]); 
  const [displayInputs, setDisplay] = useState(false); 
  const fetchUrl = 'http://localhost:3001/auth/'+id; 
  const userConnected = localStorage.getItem('id'); 
  const access_token = localStorage.getItem('token');
  //const userConnectedIsAdmin = localStorage.getItem('isAdmin'); 
  const [user, setUser] = useState([]);
  const userIdUrl = config.apiUrl+'/auth/'+userConnected; 
  const backToFeed = "/";
  const isAdmin = profile.isAdmin; 

      
        //fetch the profile info 
        useEffect(() => {
            axios.get(fetchUrl, {
              headers: {
                  'Authorization': `token ${access_token}`
              }
          }).then(res => {
                setProfile(res.data); 
            })
            .catch(err => {
                console.log(err)
            })
        }, [])

        //get the info of the user connected 
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
    
 

//logic to hangle content modification 
   const  changeHandler = e => {
      setProfile({[e.target.name]: e.target.value})
    }


  const displayModifyProfile = (e, displayInputs) => {
    //console.log('goes into display modify profile function');
    setDisplay(true); 
  }

  const sendModifyProfile = e => {
    e.preventDefault();
   // console.log(profile); 
          axios.put(config.apiUrl+'/auth/'+id, profile, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })
          .then(res => {
            //console.log(res); 
            setDisplay(false);
        })
        .catch(err => {
            console.log(err)
        })
  }



  //Logic to handle delete



  const deleteProfile = (e) => {
    //console.log('goes into delete profile funciton');

    const confirm = window.confirm('??tes vous sur.e de vouloir supprimer ce profil ? ');
    if (confirm) {
          axios.delete(config.apiUrl+'/auth/'+id, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })
        .then(redirectionProcessAfterDelete)
        .then(res => {

           
            console.log('deleted successfully')
        
        })
        .catch(err => {
            console.log(err)
        })
    }; 
   
  }

  const redirectionProcessAfterDelete = (e) => {
    // console.log('userconisadmin' + userConnectedIsAdmin); 
    // console.log('proilfuserID : ' + profile.id);
    // console.log('userConnected : ' + userConnected );
    if (userConnected == profile.id){
      //console.log('goes to login');
      localStorage.clear();
      history.push(backToFeed);
    } else {
      //console.log('goes to feed'); 
      history.push(backToFeed);
    }
  }



//JSX 


  return (
    <> <BannerSmall />

        <div>
         
        {
          (function() {

            if (displayInputs === true ) {
              
              return    <div className="profile-container"> 
                  <form onSubmit={sendModifyProfile}>
                    <input placeholder="Nom" name="username" value={profile.username} onChange={changeHandler}></input>
                    <input placeholder="Email" name="email" value={profile.email} onChange={changeHandler}></input>
                    <input placeholder="Mot de passe" name="password" value="" onChange={changeHandler}></input>
                    
                    
                    <button type='submit'>Confirmer les modifications</button>
                  </form>
                </div>
            } 
            else if (displayInputs === false)
            {
              return   <><div className="profile-container"> <h1> {profile.username}</h1> </div>

                      <div> 
                         <p> E-mail : {profile.email}</p>  </div>
                         {isAdmin == '1'  && <p>Profil administrateur </p> }

                       <div>
                                   
                          {
                            (function() {
 
                              if (userConnected == id) {
                             
                                return    <div> 
                                  <button  onClick={() => { displayModifyProfile()}}> <FontAwesomeIcon icon={faEdit} /></button>
                                  <button  onClick={() => { deleteProfile()}}> <FontAwesomeIcon icon={faTrash} /> </button>
                    
                                </div>
                              } else if (user.isAdmin) {
                               
                                return <div> 
                                  <button  onClick={() => { deleteProfile()}}>   <FontAwesomeIcon icon={faTrash} /> </button>
                  
                              </div>
                              }
                        
                            })()
                          }

                          </div>

              </>

            }
          })()
        }
  </div>

    
</>    
)
}


export default Profile