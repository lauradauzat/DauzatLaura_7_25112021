import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile  from '../pages/Profile';
import Feed from "../pages/Feed";


const routes = [


  {
    path: "/profile/:id",
    component: Profile
  }, 
  {
    path: "/",
    component: Feed
  }
 


];


function App() {


    return (
   
      <div>

        <Router>
          <Switch>           
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          </Switch>
        </Router>
   
      </div>
      
    ) 
  
    
}

export default App