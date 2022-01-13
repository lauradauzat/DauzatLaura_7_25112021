
import React from "react";
import './App';

class Comments extends React.Component {

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
        "http://localhost:3001/comments/1")
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
                <h1> Comments </h1>  {
                    items.map((item) => ( 
                    <ol key = { item.id } >
                        comment: { item.commentBody}, 
                        Id : {item.id}
                        Post: { item.postId } 
                        </ol>
                    ))
                }
            </div>
         );
    }

 




 }


export default Comments;


   





   
