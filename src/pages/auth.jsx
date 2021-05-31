import React from "react"
import { Button, TextField } from "@material-ui/core"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import ReactModal from "react-modal"
import {Redirect, Link} from "react-router-dom"
import CheckIcon from '@material-ui/icons/Check';


function RedirectIfLoggedIn(props){
    if(props.disable) return null
    let user = firebase.auth().currentUser;
    if(user){
        return (<Redirect to="/"/>)
    } else {
        return (null)
    }
}


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore()
        this.state = {
            user: null,
            checked: false,
            guest: null,
            flow: null,
            final: false,
            nick: "",
            nickShow: false,
            popupOpen: false,
            nickEntryError: {
                isError: false,
                statement: null
            }
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                this.setState({
                    user: user,
                    checked: true,
                    flow: "signedin"
                })
            } else {
                this.setState({
                    user: null,
                    checked: true,
                    flow: "ask-guest"
                })
            };
        
        })

    }

    guest(){this.setState({guest: true, flow: "game"})}
    login(){
        this.setState({
            flow: "googlesignin"
        })
    }
    googleSignIn(){
        this.setState({popupOpen: true});
        let provider = new firebase.auth.GoogleAuthProvider();
        if(!this.props.mobile) {
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log("logged in")
                this.setState({
                    user: result.user,
                    guest: false,
                    flow: "nickregistration",
                    final: true,
                    nickShow: true
                })
                if(this.state.user.photoURL === "https://wwii-aircraft.web.app/nickset"){
                    this.setState({
                        flow: "game",
                        nickShow: false,
                        popupOpen: false
                    })
                }
            }).catch((error) => {
                alert(error)
            })
        } else {
            //MOBILE BROWSERS
            
            firebase.auth().signInWithRedirect(provider)
            .then((result) => {
                console.log("logged in")
                this.setState({
                    user: result.user,
                    guest: false,
                    flow: "nickregistration",
                    final: true,
                    nickShow: true
                })
                if(this.state.user.photoURL === "https://wwii-aircraft.web.app/nickset"){
                    this.setState({
                        flow: "game",
                        nickShow: false,
                        popupOpen:false
                    })
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
    handleChange(e){
        if(e.target.value.length > 20){
            this.setState({
                nickEntryError: {
                    error: true,
                    statement: "Your nickname is longer than 20 characters."
                }
            })
        } else {
            this.setState({
                nick: e.target.value,
                nickEntryError: {
                    error: true,
                    statement: null
                }
            })
        }
        
    }
    checkNick() {
        var uniqueNick;
        if (this.state.nick.length < 6) {
            alert("Please insert a longer nickname");
            return;
        }
        this.db.collection("usernames").where("nickname", "==", this.state.nick).get().then((querySnapshot) => {
            console.log("QS" + querySnapshot.size.toString())
            if (querySnapshot.size > 0) {
                alert("Your nickname has already been taken - please try a different nickname.")
                uniqueNick = false;
                return;
            } else {
                uniqueNick = true;
            }
        }).then(() => {


            console.log(uniqueNick)
            if (uniqueNick) {
                var user = firebase.auth().currentUser;
                fetch(`https://bwc-api.vercel.app/api/index?words=${this.state.nick}`)
                    .then(response => response.json())
                    .then(profane => {
                        //Add code to change name in Firebase
                        user.updateProfile({
                            displayName: profane.result,
                            photoURL: "https://wwii-aircraft.web.app/nickset"
                        }).catch((err) => {
                            alert("There was an error processing your nickname, please try again.")
                            //window.location.reload()
                        })
                            .then(() => {
                                this.db.collection("usernames").doc(profane.result).set({
                                    nickname: profane.result,
                                    userId: user.uid,
                                    userEmail: user.email
                                })
                                    .then(() => {
                                        this.setState({
                                            flow: "nickset",
                                            nickShow: false
                                        })
                                    })
                            })
                    }).catch((err) => {
                        alert("Your nickname failed to be checked. DEV INFO - " + err)
                    })
            }
        })
    }
    componentWillUnmount(){
        this.setState({
            final: true
        })
    }
    render() {
        if(this.state.flow === "nickset"){
            this.nickSuccess = <><h1>Your username has been set!</h1><CheckIcon style={{ width: "20vw", height: "auto", color: "green"}} /><br/></>
        }
            this.redirectToGame = <Redirect to="/game"></Redirect>
        return (
            <div>
                <RedirectIfLoggedIn disable={this.state.final}/>
                <ReactModal appElement={document.getElementById('root')} isOpen={this.state.checked && !this.state.user && this.state.flow === "ask-guest"} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <h1>Whoa there! It doesn't look like you are logged in!</h1>
                    <p>If you don't log in, you will not be able to post your score on the Leaderboard. Are you sure you want to continue?</p>
                    <Button onClick={this.guest.bind(this)}>
                        Continue as Guest
                    </Button>
                    <Button onClick={this.login.bind(this)}>
                        Log In
                    </Button>
                </ReactModal>
                <ReactModal appElement={document.getElementById('root')} isOpen={this.state.flow === "googlesignin"} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <h1>Log In with Google</h1>
                    <Button disabled={this.state.popupOpen} onClick={this.googleSignIn.bind(this)}>
                        <img src="/signingoogle.png" alt="Sign In with Google" />
                    </Button>
                </ReactModal>
                <ReactModal appElement={document.getElementById('root')} isOpen={this.state.nickShow} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <h1>Set Your Nickname</h1>
                    <p><i>This will be public and show up on the Leaderboard. Do not use any personal information or any profane content as your nickname</i></p>
                    <TextField error={this.state.nickEntryError.isError} helperText={this.state.nickEntryError.statement} maxlength="20" variant="filled" label="Nickname" value={this.state.nick} onChange={this.handleChange.bind(this)}/>
                    <br/>
                    <Button onClick={this.checkNick.bind(this)}>
                        Continue
                    </Button>
                </ReactModal>
                <ReactModal appElement={document.getElementById('root')} isOpen={this.state.flow === "nickset" || this.state.flow === "game"} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <center>
                        {this.nickSuccess}
                        {this.redirectToGame}
                        <Button component={Link} to="/game">
                            Continue to Game
                        </Button>
                    </center>
                </ReactModal>
                
            </div>
        )
    }
}




export default Auth