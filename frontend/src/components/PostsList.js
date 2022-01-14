
import React from "react";
import './App';
import CommentairesContainer from "./CommentairesContainer";
import ImgContainer from "./ImgContainer";






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
            .then((res) => res.json(console.log(res)))
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
          
            <div className = "Post-container">
                <h1> Salut  </h1>
              
                  {
                    items.map((item) => (
                      
                    <>
                         <ImgContainer imageRef={item.image}></ImgContainer>
                         
                        <ol key = { item.id } >
                            Username: { item.UserId}, 
                            PostId : {item.id}, 
                            imageUrl: {item.image}
                            Post: { item.postText },
                        </ol>

                        <CommentairesContainer postId={item.id}></CommentairesContainer>
                        
                    </>    
                    
                    ))
                }
            </div>
         );
    }

 




 }


export default PostsList;


