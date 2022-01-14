
import React, { Component } from 'react'
import axios from 'axios'

 class SignIn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            password: '',
             
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://localhost:3001/auth/login", this.state)
            .then(response => {
                console.log(response, 'you are logged in'); 
            })
            .catch( error => {
                console.log(error);
            })
    }
    
    render() {
        const { username, password} = this.state
        return (
            <div className="SignIn_container">
                <h1>J'ai déjà un compte</h1>
                 <form onSubmit={this.submitHandler}>
                 <input placeholder="Nom" name="username" value={username} onChange={this.changeHandler}></input>
                <input placeholder="Mot de passe" name="password" value={password} onChange={this.changeHandler}></input>
                
                <button type='submit'>Se connecter</button>
                 </form>

            </div>
        )
    }
}

export default SignIn; 