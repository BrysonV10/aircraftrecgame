import React from "react" //main react stuff
import GameLoader from "./gameLoader.jsx" //Loader
import Question from "./question.jsx" //Question screen
import {randomBetween, shuffle} from "./utils.js" // random utilities



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
        this.planeDB = [];
        fetch(import.meta.env.VITE_PLANES_JSON_URL).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then((planedata) => {
            this.planeDB = planedata;
            this.setupFirstQuestion();
            return;
        }).catch((error) => {
            console.error("Error fetching planes.json: ", error);
        });
        this.setupFirstQuestion.bind(this);
        
        }

        setupFirstQuestion(){
            let newId = randomBetween(0, this.planeDB.length - 1);
            this.state.idsAlreadyUsed = [newId];
            let planeImg = null
            let plane = null

            let data = this.planeDB[newId];
            console.log("data: ", this.planeDB);
            let planeArr = [{
                name: data.name,
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

            planeArr = shuffle(this.planeDB);
            planeImg = data.imgurl;
            plane = {
                name: data.name,
                description: data.description,
                imgURL: data.imgurl
            }

            this.state.currentPlane = planeArr;
            this.state.currentPlaneImg = planeImg;
            this.props.addNewPlane(plane, false);
        }
    
    getNewQuestion() {
        let newId = randomBetween(0, this.planeDB.length - 1);
        while (this.state.idsAlreadyUsed.includes(newId)) {
            newId = randomBetween(0, this.planeDB.length - 1);
        }
        this.setState({
            idsAlreadyUsed: this.state.idsAlreadyUsed.concat(newId)
        })
        let planeImg = null
        let plane = null

        let data = this.planeDB[newId];
        let planeArr = [{
            name: data.name,
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
        planeImg = data.imgurl;
        plane = {
            name: data.name,
            description: data.description,
            imgURL: data.imgurl
        }

        this.props.addNewPlane(plane);
        this.setState({
            currentPlane: planeArr,
            currentPlaneImg: planeImg
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
                nickname: "User"
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
        window.localStorage.setItem("score", JSON.stringify(newData));
        this.props.saveScoreAtRoot(newData)
    }

    render(){
        if(!this.state.nickname){ 
            var disabled = true;
        } else {
            var disabled = false;
        }
        return (
            <div id="game" style={{ width: "100%", marginLeft: "0px" }}>
                {this.state.redirect}
                <GameLoader disableQuestion={disabled} show={this.state.loading} user={this.state.user} onReady={this.stateChange.bind(this)} />
                <Question mobile={this.props.isMobile} user={this.state.user} saveScoreAtRoot={this.putScoreInRoot.bind(this)} newQuestion={this.getNewQuestion.bind(this)} loading={this.state.loading} scoreUpdate={this.addToScore}  options={this.state.currentPlane} show={!this.state.loading} imageSrc={this.state.currentPlaneImg} score={this.state.scoreArr} />
                
            </div>
        )
    }
}




export default Game