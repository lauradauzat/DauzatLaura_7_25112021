import React, {useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { useParams } from 'react-router-dom'; 
import BannerSmall from "../components/BannerSmall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function Profile () {
  // console.log('coucou profile page');
  const { id }  = useParams(); 
  let history = useHistory(); 
  const [profile, setProfile] = useState([]); 
  const [displayInputs, setDisplay] = useState(false); 
  const fetchUrl = 'http://localhost:3001/auth/'+id; 
  //console.log ('display : ' +displayInputs); 
  const userConnected = localStorage.getItem('id'); 
  const access_token = localStorage.getItem('token');
  const userConnectedIsAdmin = localStorage.getItem('isAdmin'); 

  const [user, setUser] = useState([]);
  const userIdUrl = 'http://localhost:3001/auth/'+userConnected; 
 

  console.log('eeeeeeeee' + user.isAdmin);

  

  

  const backToFeed = "/";

          useEffect(() => {
            axios.get(fetchUrl, {
              headers: {
                  'Authorization': `token ${access_token}`
              }
          }).then(res => {
                console.log('profile container res: ' + res)
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
    
  const isAdmin = profile.isAdmin; 
 // console.log(isAdmin); 

   const  changeHandler = e => {
      setProfile({[e.target.name]: e.target.value})
    }


  const displayModifyProfile = (e, displayInputs) => {
    console.log('goes into display modify profile function');
    setDisplay(true); 
    //console.log(displayInputs);


  }

  const redirectionProcessAfterDelete = (e) => {
    console.log('userconisadmin' + userConnectedIsAdmin); 
    console.log('proilfuserID : ' + profile.id);
    console.log('userConnected : ' + userConnected );
    if (userConnected == profile.id){
      console.log('goes to login');
      localStorage.clear();
      history.push(backToFeed);
    } else {
      console.log('goes to feed'); 
      history.push(backToFeed);
    }
  }

  const sendModifyProfile = e => {
    e.preventDefault();
    console.log(profile); 
          axios.put('http://localhost:3001/auth/'+id, profile, {
            headers: {
                'Authorization': `token ${access_token}`
            }
        })
          .then(res => {
            console.log(res); 
            setDisplay(false);
        })
        .catch(err => {
            console.log(err)
        })
  }

  const deleteProfile = (e) => {
    console.log('goes into delete profile funciton');

    const confirm = window.confirm('Êtes vous sur.e de vouloir supprimer ce profil ? ');
    if (confirm) {
          axios.delete('http://localhost:3001/auth/'+id, {
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



  return (
    <> <BannerSmall />
    {/* <div>
      <button onClick={() => {history.push(backToFeed)}} > Retourner au Feed</button>
    </div>
     */}

        Profile : {id}
        <div>
         
        {
          (function() {
            // console.log('displauy : ' + displayInputs); 
            if (displayInputs === true ) {
              
              return    <div> 
                  <form onSubmit={sendModifyProfile}>
                    <input placeholder="Nom" name="username" value={profile.username} onChange={changeHandler}></input>
                    <input placeholder="Email" name="email" value={profile.email} onChange={changeHandler}></input>
                    <input placeholder="Mot de passe" name="password" value="" onChange={changeHandler}></input>
                    <label>
                        <input type="checkbox" />
                        Compte administrateur
                    </label>
                    
                    <button type='submit'>Confirmer les modifications</button>
                  </form>
                </div>
            } 
            else if (displayInputs === false)
            {
              return   <><div> <h1> {profile.username}</h1> </div>

                      <div>     <p> E-mail : {profile.email}</p>  </div>

                                                
                          <p>Profil admin : 

                  {isAdmin == '1' &&
                  <p> oui </p>} 
                  {isAdmin == null &&
                  <p> non </p>} 


                          
                        </p>
                        <div>
                                   
                          {
                            (function() {
                              // console.log('displauy : ' + displayInputs); 
                              if (userConnected == id) {
                             
                                return    <div> 
                                  <button  onClick={() => { displayModifyProfile()}}> Modifier le profil   <FontAwesomeIcon icon={faEdit} /></button>
                                  <button  onClick={() => { deleteProfile()}}> Supprimer le profil   <FontAwesomeIcon icon={faTrash} /> </button>
                    
                                </div>
                              } else if (user.isAdmin) {
                               
                                return <div> 
                                <p> yoooo</p>
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