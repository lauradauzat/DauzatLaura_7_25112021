
import React, { Component } from 'react'
import axios from 'axios'

 class SignUp extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: '', 
            email: '', 
            password: '',
             
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post("http://localhost:3001/auth/signup", this.state)
            .then(response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error);
            })
    }
    
    render() {
        const { username, email, password} = this.state
        return (
            <div className="SignUp_container">
                
                <h1>Créer un nouveau compte</h1>
                
                 <form onSubmit={this.submitHandler}>
                 <input placeholder="Nom" name="username" value={username} onChange={this.changeHandler}></input>
                <input placeholder="Email" name="email" value={email} onChange={this.changeHandler}></input>
                <input placeholder="Mot de passe" name="password" value={password} onChange={this.changeHandler}></input>
                <label>
                    <input type="checkbox" />
                    Compte administrateur
                </label>
                
                <button type='submit'>Créer mon compte</button>
                 </form>

            </div>
        )
    }
}

export default SignUp
