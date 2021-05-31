import React from "react"
import { Button } from "@material-ui/core"
import firebase from "./firebase.js"
import "firebase/firestore"
import "firebase/auth"
import {Redirect, Link} from "react-router-dom"

//Actual Game Page
class GameLoader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            checkedAuth: false,
            nickname: ""
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.user && this.props.user !== prevProps.user && prevState.nickname == ""){
            this.setState({
                nickname: this.props.user.displayName
            })
        }
    }

    render(){
        if(this.props.show){
            var disp = "block"
            return (
                <div id="game" style={{ display: disp}}>
                    <h1>Welcome {this.state.nickname}! Are you ready?</h1>
                    <Button disabled={this.props.disableQuestion} variant="contained" color="primary" onClick={this.props.onReady}>Ready!</Button>
                    <br/>
                    <i>Not {this.state.nickname}? <Link to="/signout/game">Sign out now!</Link></i>
                </div>
            )
        } else {
            return (null)
        }
    }
}


export default GameLoader