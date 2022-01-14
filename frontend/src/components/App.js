// import "./App.css";

// import Home from "../pages/Home";
// import CreatePost from "../pages/CreatePost";
// import Post from "../pages/Post";

// function App() {
//   return 
    
//     (<div className="App">
//       <Router>
//         <Link to="/createpost"> Create A Post</Link>
//         <Link to="/"> Home Page</Link>
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/createpost" exact component={CreatePost} />
//           <Route path="/post/:id" exact component={Post} />
//         </Switch>
//       </Router>
//     </div>);
  
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Banner from './Banner'
import PostsList from './PostsList'
import SignUp from './SignUp'
import SignIn from './SignIn'
import CreateAPost from './CreateAPost'
import Profile  from '../pages/Profile'


//prochaine etape : affichage des images 
//ensuite commentaire à l'intérieur des posts

function App() {
    return (
      <div>
        <Banner />
        <SignUp />
        <SignIn />
        <CreateAPost />

        <Router>
          <Switch>
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/' component={PostsList} />

          </Switch>
        </Router>
   
      </div>
      
    ) 
  
    
}

export default App