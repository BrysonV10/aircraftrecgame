import React from "react" //main react stuff
import {LinearProgress, Button, CircularProgress} from "@material-ui/core" //Material UI for buttons and loaders
import firebase from "./firebase.js" //firebase with config
import "firebase/firestore" //firestore database
import "firebase/auth" //firebase auth
import {Redirect, Link} from "react-router-dom" //all the routing stuff (redirects and links only)
import GameLoader from "./gameLoader.jsx" //Loader
import Question from "./question.jsx" //Question screen
import {randomBetween, shuffle} from "./utils.js" // random utilities
//Redirect Component
function RedirectNotLoggedIn(props){
    if(props.isChecked) return (null)
    let result = firebase.auth().onAuthStateChanged((user) => {
        props.authChecked(user)
        console.log(props)
        console.log("user")
        console.log(user)
        if(user){
            console.log("user signed in")
            props.successfulCheck(user)
            return (null);
        } else {
            console.log("Not signed in")
            props.badCheck()
            return (null)
        }
    })
    
    return result
}


//Actual Game Page
class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            checkedAuth: false,
            nickname: "",
            redirect: (null),
            loading: true,
            scoreArr: [],
            totalPlanesLoaded: null,
            currentPlane: [],
            currentPlaneImg: null,
            idsAlreadyUsed: []
        }
        this.addToScore = this.addToScore.bind(this);
        this.db = firebase.firestore()
        let totalPlanes;
        this.db.collection("planes").get().then((querySnapshot) => {
            totalPlanes = querySnapshot.size
        }).then(() => {
            let newId = randomBetween(0, totalPlanes - 1);
            this.state.idsAlreadyUsed = [newId];
            console.log(newId.toString() + " - ID")
            this.db.collection("planes").where("id", "==", newId).get().then((querySnapshot) => {
                console.log(querySnapshot.size)
                if (querySnapshot.size > 1) {
                    console.error("WARNING: INVALID DATA. A plane document was invalid and resulted in an common ID");
                    alert("Critical Error.");
                    return;
                }
                let planeArr = []
                let planeImg = null
                let plane = null
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    planeArr = [{
                        name: doc.id,
                        isCorrect: true
                    }, {
                        name: data.option1,
                        isCorrect: false
                    }, {
                        name: data.option2,
                        isCorrect: false
                    }, {
                        name: data.option3,
                        isCorrect: false
                    }]
                    planeArr = shuffle(planeArr);
                    planeImg = data.imgurl
                    plane = {
                        name: doc.id,
                        description: data.description,
                        imgURL: data.imgurl
                    }
                })
                this.state.currentPlane = planeArr;
                this.state.currentPlaneImg = planeImg;
                this.props.addNewPlane(plane)
                console.log(this.state);

            })
        })
        }
    
    getNewQuestion() {
        let totalPlanes;
        this.db.collection("planes").get().then((querySnapshot) => {
            totalPlanes = querySnapshot.size
        }).then(() => {
            let newId = randomBetween(0, totalPlanes - 1);
            while (this.state.idsAlreadyUsed.includes(newId)) {
                newId = randomBetween(0, totalPlanes - 1)
            }
            this.setState({
                idsAlreadyUsed: this.state.idsAlreadyUsed.concat(newId)
            })
            console.log(newId.toString() + " - ID")
            this.db.collection("planes").where("id", "==", newId).get().then((querySnapshot) => {
                console.log(querySnapshot.size)
                if (querySnapshot.size > 1) {
                    console.error("WARNING: INVALID DATA. A plane document was invalid and resulted in an common ID");
                    alert("Critical Error.");
                    return;
                }
                let planeArr = []
                let planeImg = null;
                let plane = null
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    planeArr = [{
                        name: doc.id,
                        isCorrect: true
                    }, {
                        name: data.option1,
                        isCorrect: false
                    }, {
                        name: data.option2,
                        isCorrect: false
                    }, {
                        name: data.option3,
                        isCorrect: false
                    }]
                    planeArr = shuffle(planeArr);
                    planeImg = data.imgurl
                    plane = {
                        name: doc.id,
                        description: data.description,
                        imgurl: data.imgurl
                    }
                })
                this.props.addNewPlane(plane)
                this.setState({
                    currentPlane: planeArr,
                    currentPlaneImg: planeImg
                })
                console.log(this.state);
            })
        })
    }

        authChange() {
            this.setState({
                authChecked: true
            })
        }
        goodCheck(user) {
            this.setState({
                user: user,
                nickname: user.displayName
            })
        }

        badCheck() {
            this.setState({
                redirect: ( < Redirect to = "/auth" / > )
            })
        }

    stateChange(isLoading) {
        console.log("this.stateChange " + isLoading)
        this.setState({
            loading: false
        })
    }

    addToScore(score) {
        this.setState({
            scoreArr: this.state.scoreArr.concat(score)
        })
    }
    putScoreInRoot(data){
        let newData = {score: data.score, leaderboard: data.leaderboard, ids: this.state.idsAlreadyUsed}
        this.props.saveScoreAtRoot(newData)
    }
    render(){
        
        if(!this.state.nickname){ 
            var showLoader = "block";
            var disabled = true;
        } else {
            var showLoader = "none";
            var disabled = false;
        }
        return (
            <div id="game" style={{ width: "100%", marginLeft: "0px" }}>
                {this.state.redirect}
                <RedirectNotLoggedIn authChecked={this.authChange.bind(this)} badCheck={this.badCheck.bind(this)} successfulCheck={this.goodCheck.bind(this)} isChecked={this.state.authChecked}/>
                <GameLoader disableQuestion={disabled} show={this.state.loading} user={this.state.user} onReady={this.stateChange.bind(this)} />
                <Question mobile={this.props.isMobile} user={this.state.user} saveScoreAtRoot={this.putScoreInRoot.bind(this)} newQuestion={this.getNewQuestion.bind(this)} loading={this.state.loading} scoreUpdate={this.addToScore}  options={this.state.currentPlane} show={!this.state.loading} imageSrc={this.state.currentPlaneImg} score={this.state.scoreArr} />
                <center>
                    <CircularProgress style={{display: showLoader}}/>
                </center>
            </div>
        )
    }
}




export default Game