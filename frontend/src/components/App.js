import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Profile  from '../pages/Profile';
import Login from "../pages/Login";
import Feed from "../pages/Feed";
import { useLocation } from "react-router-dom";


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