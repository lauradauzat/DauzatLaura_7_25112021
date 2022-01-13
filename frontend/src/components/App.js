// import "./App.css";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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

import Banner from './Banner'
import PostsList from './PostsList'
import SignUp from './SignUp'
import SignIn from './SignIn'
import CreateAPost from './CreateAPost'
import Comments from './Comments'

function App() {
    return (
      <div>
        <Banner />
        <SignUp />
        <SignIn />
        <CreateAPost />

        <PostsList/>
        <Comments />
      </div>
      
    ) 
  
    
}

export default App