
import React, { Component } from 'react'
import axios from 'axios'

 class CreateAPost extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            postText: '',    
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://localhost:3001/posts", this.state)
            .then(response => {
                console.log(response, 'posted'); 
            })
            .catch( error => {
                console.log(error);
            })
    }
    
    render() {
        const { postText } = this.state
        return (
            <div className="NewPost_container">
                
                 <form onSubmit={this.submitHandler}>
                 <input placeholder="Say Something" name="postText" value={postText} onChange={this.changeHandler}></input>
       
                
                <button type='submit'>Publier</button>
                 </form>

            </div>
        )
    }
}

export default CreateAPost; 
