
import React from "react";
import './App';

class PostsList extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
        "http://localhost:3001/posts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Chargement en cours.... </h1> </div> ;
   
        return (
            <div className = "App">
                <h1> Salut  </h1>  {
                    items.map((item) => ( 
                    <ol key = { item.id } >
                        User_Name: { item.UserId}, 
                        Post: { item.postText } 
                        </ol>
                    ))
                }
            </div>
         );
    }




 }


export default PostsList;


   





   
