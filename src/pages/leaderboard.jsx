import React from "react"
import {Grid, Button, CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom"
import ImageFadeIn from "react-image-fade-in"
import {Fade, Flip} from "react-reveal"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import firebase from "./firebase.js"
import "firebase/firestore"
import Plane from "./plane.jsx"
import Footer from "./footer.jsx"
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
        console.log("everuthing else")
        this.db = firebase.firestore()
        }

    componentDidMount(){
        this.db.collection("leaderboard").limit(10).orderBy("score", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({
                    leaderLoaded: true,
                    leaderboardArr: this.state.leaderboardArr.concat({name: doc.data().name, score: doc.data().score})
                })
            })
            
        }).catch((err) => {
            alert("Failed to get leaderboard information. Please check your internet connection.");
            console.error(err)
        })
        if(this.state.showScore){
            console.log("getting planes")
            this.db.collection("planes").where("id", "in", this.state.planeIdsToShow).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    this.setState({
                        planesData: this.state.planesData.concat({name: data.name, description: data.description, img: data.imgurl, imgsrc: data.imgsrc})
                    })
                })
                }).then(() => {
                    this.setState({
                        planesLoaded: true
                    })
            })
        }
        
    }
    imageLoaded(){
        setTimeout(() => {
            this.setState({ disp: "block"})
        }, 50)
        
    }
    scrollToLeaderboard(){
        this.refs.leaderboardScroll.scrollIntoView()
    }
    render(){
        if(this.state.showScore){
            var scoreStyle = "inline";
            var topMessage = "Game Over"
        } else {
            var scoreStyle = "none"
            var topMessage = "WWII Aircraft Leaderboard"
        }
        if(this.state.leaderLoaded){
            var leaderboardComps = this.state.leaderboardArr.map((user, key) => {
                return ((<li key={user.name + user.score.toString() + key.toString()}>{user.name} - {user.score.toString()}</li>))
            })
        } else {
            var leaderboardComps = <CircularProgress/>
        }
       
        if(this.state.disp == 'block' && this.state.showScore == true){
            console.log("Showing Planes")
            var planesToShowStyle = "block";
        } else {
            var planesToShowStyle = "none";
        }
        if(this.state.planesLoaded){
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
        console.log(mobileComp)
        return (
            <div>
                <div id="bg-contain">
                    <ImageFadeIn style={{ filter: "blur(10px)", marginBottom: mobileComp.imgMargin}} onLoad={this.imageLoaded.bind(this)} className="bg" src={mobileComp.imgsrc} />
                </div>
                <Grid className="text-contain" container direction="column" justify="space-evenly" alignItems="center">
                    <div id="text">
                        <Fade bottom>
                            <h1>{topMessage}</h1>
                            <h6 style={{ display: scoreStyle}}>You scored <strong>{this.state.score}</strong> points!</h6>
                        </Fade>
                    </div>
                    <Fade bottom style={{ maxHeight: "120px" }}>
                        <Grid item style={{ paddingTop: "30px" }}>
                            <Button className="fadeOnHover" variant="contained" component={Link} to={"/game"}>Play Now!</Button>
                        </Grid>
                        <Grid item style={{ paddingTop: "30px"}}>
                            <Button className="fadeOnHover" variant="contained" onClick={this.scrollToLeaderboard.bind(this)}>
                                <ArrowDownwardIcon/>
                                Jump to Leaderboard
                                <ArrowDownwardIcon/>
                            </Button>
                        </Grid>
                        <Grid item style={{ paddingTop: "30px"}}>
                            <Button variant="contained" component={Link} to={"/"}>Back Home</Button>
                        </Grid>
                    </Fade>
                </Grid>
                {mobileComp.brComp}
                <center>
                <Grid style={{display: planesToShowStyle,  marginTop: mobileComp.marginComp, width: "90vw"}} className="planesYouSaw" container direction="column" justify="space-evenly" alignItems="center">
                    <Grid item>
                        <Fade bottom>
                            <center>
                            <h1>Planes you encountered</h1>
                            </center>
                        </Fade>
                    </Grid>
                    <Grid container item direction="column" justify="space-evenly" alignItems="center">
                        <Flip cascade bottom>
                        {planesComp}
                        </Flip>
                    </Grid>
                </Grid>
                </center>
                <br/>
                <Grid style={{display: this.state.disp}} className="leaderboard" container direction="column" justify="space-evenly" alignItems="center">
                    <Grid item container style={{ marginTop: "7vh", backgroundColor: "rgba(113, 156, 185, 0.61)", width: "90vw", margin: "auto"}} direction="column" justify="space-evenly" alignItems="center">
                        <Grid item>
                            <h1 ref="leaderboardScroll" style={{ fontSize: "clamp(24px, 6vw, 50px)",backgroundColor: "rgba(122, 122, 122, 0.8)", width: "80vw", textAlign: "center", borderStyle: "solid", borderWidth: "1px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}><i>LEADERBOARD</i></h1>
                        </Grid>
                        <Grid item container alignItems="center" >
                            <Flip cascade bottom>
                            <ol style={{ paddingLeft: "5.5vw", fontSize: "clamp(20px, 4.5vw,30px)"}} className="leaderboard-list">
                                {leaderboardComps}
                            </ol>
                            </Flip>
                        </Grid>
                    </Grid> 
                </Grid>
                <br/>
                <Footer/>
            </div>
        )
    }
}


export default Leaderboard