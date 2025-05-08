import React from "react"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "./Styles.css"
import OptionButton from "./OptionButton.jsx"
import ReactModal from "react-modal"
import CheckIcon from '@mui/icons-material/Check';
import IncorrectIcon from '@mui/icons-material/Close' 
import "animate.css/animate.min.css"
import {Navigate} from "react-router-dom"


class Question extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: 0,
            startTime: 0,
            questionClicked: false,
            incorCor: null,
            score: null,
            imageLoaded: false,
            oldScore: 0,
            needToRedirect: null
        }
        this.audioContext = new AudioContext()
        window.fetch("/gong.mp3")
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      this.gongBuffer = audioBuffer;
    });
        this.imageLoaded = this.imageLoaded.bind(this)
        this.continue = this.continue.bind(this)
        this.playGongAudio = this.playGongAudio.bind(this)
    }
    componentDidMount(){
        console.log("Question Mounted")
        this.startTimer = this.startTimer.bind(this)
    }
    playGongAudio(){
        const source = this.audioContext.createBufferSource();
        source.buffer = this.gongBuffer;
        source.connect(this.audioContext.destination);
        source.start();
    }
    startTimer(){
        
        this.setState({
            startTime: Date.now() 
        })
        
        this.timer = setInterval(() => {
            let time = Math.round(((Date.now() - this.state.startTime)/1000)*100)/100
            if(time >= 25){
                this.handleClick(false);
            }
            this.setState({
                time: time
            })
        }, 10)
    }
    handleClick(isCorrect){
        clearInterval(this.timer)
        this.setState({
            oldScore: this.props.score.reduce((a, b) => a + b, 0)
        })
        if(isCorrect){
            let points = [1-(this.state.time/25/2)]*1000;
            console.log(points)
            this.setState({
                score: Math.round(points),
                questionClicked: true,
                incorCor: "correct"
            })
            this.props.scoreUpdate(Math.round(points));
        } else {
            this.playGongAudio()
            this.setState({
                questionClicked: true,
                incorCor: "incorrect"
            })
            
            this.props.scoreUpdate(0)
        }
        //this.imageReloading()
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
    imageLoaded(){
        console.log("image is loaded");
        this.startTimer()
        this.setState({
            imageLoaded: true
        })
    }
    
    continue() {
        if (this.props.score.length === 10) {
            //save score and redirect
            let score = this.props.score.reduce((a, b) => a + b, 0)
            this.props.saveScoreAtRoot({ score: score, leaderboard: false })
            this.setState({
                needToRedirect: <Navigate replace to={"/leaderboard"} />
            })

        } else {
            this.setState({
                questionClicked: false,
                incorCor: null,
                imageLoaded: false
            })
            this.props.newQuestion();
        }

    }
    render(){
        if(this.props.show){
            var show = "block"
        } else {
            var show = "none"
        }
        
        if(this.props.loading){
            return (null)
        } else {
        var score = this.props.score.reduce((a, b) => a + b, 0);
        var progress = this.props.score.length;
        
        if(this.props.mobile != true){
            var imgClass = "image-question";
        } else {
            var imgClass = "image-question-mobile"
        }
        return (
            <div className="question-contain" style={{ display: show, width: "100vw" }}>
                {this.state.needToRedirect}
                <Grid className="navbar-question" container direction="row" justify="space-around" alignItems="center">
                    <Grid item style={{ backgroundImage: "linear-gradient(180deg, #c4c4c4, #a9a9a9)", width: "100vw", height: "5vh",textAlign: "center"}} >
                        <Typography id="time" color="textPrimary">{this.state.time}</Typography>
                    </Grid>
                </Grid>
                <Grid className="main-question" container direction="column" justify="space-around" alignItems="center">
                    <Grid item className={imgClass} mb={3}>
                        <img className={imgClass} onLoad={this.imageLoaded} src={this.props.imageSrc}/>
                    </Grid>
                    <br/>
                    <Grid container item spacing={2} className="buttons-question" direction="row" justify="space-around" alignItems="center" style={{ paddingLeft: "2vw", paddingRight: "2vw"}}>
                        <Grid item xs={6}>
                            <OptionButton show={this.state.imageLoaded} color="red" name={this.props.options[0].name} correct={this.props.options[0].isCorrect} handler={this.handleClick.bind(this)} />
                        </Grid>
                        <Grid item xs={6}>
                            <OptionButton show={this.state.imageLoaded} color="green" name={this.props.options[1].name} correct={this.props.options[1].isCorrect} handler={this.handleClick.bind(this)} />
                        </Grid>
                        <Grid item xs={6}>
                            <OptionButton show={this.state.imageLoaded} color="yellow" name={this.props.options[2].name} correct={this.props.options[2].isCorrect} handler={this.handleClick.bind(this)}/>
                        </Grid>
                        <Grid item xs={6} >
                            <OptionButton show={this.state.imageLoaded} color="blue" name={this.props.options[3].name} correct={this.props.options[3].isCorrect} handler={this.handleClick.bind(this)}/>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Correct Modal */}
                <ReactModal style={{ content: { backgroundColor: "rgba(0, 153, 2, 0.4)"} }} appElement={document.getElementById('root')} isOpen={this.state.questionClicked && this.state.incorCor == "correct"} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <center style={{ backgroundColor: "rgba(81, 81, 81, 0.4)", width: "50vw", margin: "auto", paddingBottom: "10vh"}}>
                        <CheckIcon style={{ color: "green", height: "20vh", width: "auto"}} />
                        <br/>
                        <h3>Correct!</h3>
                        <p>You scored {this.state.score} points!</p>
                        <br/> 
                        <Button variant="contained" disabled={false} onClick={this.continue}>
                            Continue
                        </Button>
                        <p className="totalPoints animate__animated animate__flipInX">{score}</p>
                        <p className="totalPoints animate__animated animate__flipInX" style={{ marginTop: "5px"}}>Question #{progress}/10</p>
                    </center>
                </ReactModal>
                {/* Incorrect Modal */}
                <ReactModal style={{ content: {backgroundColor: "rgba(226, 13, 13, 0.3)"}}} appElement={document.getElementById('root')} isOpen={this.state.questionClicked && this.state.incorCor == "incorrect"} shouldCloseOnEsc={false} shouldFocusAfterRender={true}>
                    <center style={{ backgroundColor: "rgba(81, 81, 81, 0.4)", width: "50vw", margin: "auto", paddingBottom: "10vh"}}>
                        <IncorrectIcon style={{ color: "red", height: "20vh", width: "auto" }} />
                        <br />
                        <h3>Incorrect</h3>
                        <p>No points for this round!</p>
                        <br/>
                        <Button variant="contained" disabled={false} onClick={this.continue}>
                            Continue
                        </Button>
                        <p className="totalPoints animate__animated animate__flipInX">{score}</p>
                        <p className="totalPoints animate__animated animate__flipInX" style={{ marginTop: "5px"}}>Question #{progress}/10</p>
                    </center>
                </ReactModal>
            </div>
        )
        }
    }
}

export default Question