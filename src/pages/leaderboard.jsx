import React from "react"

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom"
import ImageFadeIn from "react-image-fade-in"
import {Fade, Flip} from "react-reveal"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Plane from "./plane.jsx"
import Footer from "./footer.jsx"
import "./Styles.css"

class Leaderboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            score: null,
            showScore: false,
            madeLeaderboard: null,
            leaderboardArr: [],
            leaderComps:[],
            leaderLoaded: false,
            disp: "none",
            planeIdsToShow: [],
            planesLoaded: false,
            planesData: []
        }
        this.leaderboardRef = React.createRef();
        try {
            let data = this.props.getScore()
            this.state.score = data.score
            this.state.madeLeaderboard = data.leaderboard
            this.state.planeIdsToShow = data.ids
            if(this.state.score != null){
                this.state.showScore = true
            }
        } catch(err){
            console.log("Non-breaking error: " + err)
        }

        fetch(import.meta.env.VITE_PLANES_JSON_URL).then((response) => {
            if(response.ok){
                return response.json();
            }
        }
        ).then((planedata) => {
            this.state.planesData = planedata;
            this.state.planesLoaded = true;
            this.setState({planesData: planedata})
            return;
        }
        ).catch((error) => {
            console.error("Error fetching planes.json: ", error);
        });
    }

    imageLoaded(){
        setTimeout(() => {
            this.setState({ disp: "block"})
        }, 50)
        
    }
    scrollToLeaderboard(){
        this.leaderboardRef.current.scrollIntoView()
    }

    componentDidMount(){
        if(window.localStorage.getItem("score") != null){
            let scoreData = window.localStorage.getItem("score");
            scoreData = JSON.parse(scoreData);
            this.setState({
                score: scoreData.score,
                showScore: true,
                madeLeaderboard: scoreData.leaderboard,
                planeIdsToShow: scoreData.ids
            })
            window.localStorage.removeItem("score");
        }
    }
    render(){
        console.log("Leaderboard props: ", this.props);
        console.log("Leaderboard state: ", this.state);
        if(this.state.showScore){
            var scoreStyle = "inline";
            var topMessage = "Game Over"
        } else {
            var scoreStyle = "none"
            var topMessage = "WWII Aircraft Leaderboard"
        }
       
        if(this.state.disp == 'block' && this.state.showScore == true){
            console.log("Showing Planes")
            var planesToShowStyle = "block";
        } else {
            var planesToShowStyle = "none";
        }
        if(this.state.planeIdsToShow.length > 0){
            var planesComp = this.state.planesData.map((plane, key) => {
                return ((<Plane key={key} data={plane}/>));
            })
        } else {
            var planesComp = <CircularProgress/>
        }
        
        var mobileComp = {brComp: null, marginComp: "0vh", imgMargin: "0vh", imgsrc: "https://firebasestorage.googleapis.com/v0/b/wwiiplanesrec.appspot.com/o/leaderboardbackground.jpg?alt=media&token=f9995a8d-1451-4ddd-b8ca-927d2a79fefc"}
        if(this.props.mobile == true){
            mobileComp.brComp = (<><br/><br/><br/></>);
            mobileComp.marginComp = "20vh"
            mobileComp.imgMargin = "10vh"
            mobileComp.imgsrc="https://firebasestorage.googleapis.com/v0/b/wwiiplanesrec.appspot.com/o/wwiibomberback.jpg?alt=media&token=94b7d91c-95aa-4f54-8e6c-1a384f9a73da"
        } else {
            mobileComp.brComp = null;
        }
        return (
            <div>
                <div id="bg-contain">
                    <ImageFadeIn style={{ filter: "blur(10px)", marginBottom: mobileComp.imgMargin}} onLoad={this.imageLoaded.bind(this)} className="bg" src={mobileComp.imgsrc} />
                </div>
                <Grid className="text-contain" container direction="column" justify="space-evenly" alignItems="center">
                    <div id="text">
                        
                            <h1 className="fadeIn1s">{topMessage}</h1>
                            <h6 className="fadeIn2s" style={{ display: scoreStyle}}>You scored <strong>{this.state.score}</strong> points!</h6>
                        
                    </div>
                    <div style={{ maxHeight: "120px" }}>
                        <Grid item style={{ paddingTop: "30px" }}>
                            <Button className="fadeOnHover fadeIn3s" variant="contained" component={Link} to={"/game"}>Play Now!</Button>
                        </Grid>
                        <Grid item style={{ paddingTop: "30px"}}>
                            <Button className="fadeOnHover fadeIn3s" variant="contained" onClick={this.scrollToLeaderboard.bind(this)}>
                                <ArrowDownwardIcon/>
                                Jump to Leaderboard
                                <ArrowDownwardIcon/>
                            </Button>
                        </Grid>
                        <Grid item style={{ paddingTop: "30px"}}>
                            <Button className="fadeOnHover fadeIn3s" variant="contained" component={Link} to={"/"}>Back Home</Button>
                        </Grid>
                    </div>
                </Grid>
                {mobileComp.brComp}
                <center>
                <Grid style={{display: planesToShowStyle,  marginTop: mobileComp.marginComp, width: "90vw"}} className="planesYouSaw" container direction="column" justify="space-evenly" alignItems="center">
                    <Grid item>
                        <div>
                            <center>
                            <h1 style={{ fontSize: "clamp(24px, 6vw, 50px)",backgroundColor: "rgba(122, 122, 122, 0.8)", width: "80vw", textAlign: "center", borderStyle: "solid", borderWidth: "1px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><i>PLANES YOU ENCOUNTERED</i></h1>
                            </center>
                        </div>
                    </Grid>
                    <Grid container item direction="column" justify="space-evenly" alignItems="center">
                        {planesComp}
                    </Grid>
                </Grid>
                </center>
                <br/>
                <Grid style={{display: this.state.disp}} className="leaderboard" container direction="column" justify="space-evenly" alignItems="center">
                    <Grid item container style={{ marginTop: "7vh", backgroundColor: "rgba(113, 156, 185, 0.61)", width: "90vw", margin: "auto"}} direction="column" justify="space-evenly" alignItems="center">
                        <Grid item>
                            <h1 ref={this.leaderboardRef} style={{ fontSize: "clamp(24px, 6vw, 50px)",backgroundColor: "rgba(122, 122, 122, 0.8)", width: "80vw", textAlign: "center", borderStyle: "solid", borderWidth: "1px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><i>LEADERBOARD</i></h1>
                        </Grid>
                        <Grid item container alignItems="center" >
                            <Flip cascade bottom>
                            <ol style={{ paddingLeft: "5.5vw", fontSize: "clamp(20px, 4.5vw,30px)"}} className="leaderboard-list">
                                <li>John K. - 9703</li>
                                <li>Alex G. - 8719</li>
                                <li>VanZAviation - 6761</li>
                                <li>Fillinger - 6547</li>
                                <li>Bryson - 3840</li>
                                <li>Connor - 3759</li>
                            </ol>
                            </Flip>
                        </Grid>
                        <p><i>You're viewing an archived version of the leaderboard, new scores will no longer submit.</i></p>

                    </Grid> 
                </Grid>
                <br/>
                <Footer/>
            </div>
        )
    }
}


export default Leaderboard