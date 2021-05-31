import React from "react"
import {Link} from "react-router-dom"
import "./Styles.css"
import ImageFadeIn from "react-image-fade-in"
import {Button, Grid} from "@material-ui/core"
import {Fade} from "react-reveal"
import Footer from "./footer.jsx"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disp: "none",
            mobileComp: "clamp(20px, 10vh, 30px)"
        }
    }
    componentDidMount(){
        let check = false;
        //eslint-disable-next-line
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        if(check){
            this.setState({
                mobileComp: "clamp(120px, 50vh, 130px)"
            })
        } 
    } 
    imageLoaded(){
        this.setState({ disp: "block"})
    }
    render(){
        return (
        <div className="home" >
           <div id="bg-contain" >
               <ImageFadeIn onLoad={this.imageLoaded.bind(this)} className="bg"  src={"https://firebasestorage.googleapis.com/v0/b/wwiiplanesrec.appspot.com/o/wwiihome.jpg?alt=media&token=b6b4d518-76a2-4482-9ff6-2845eabee219"} />
           </div>
           <Grid className="text-contain" container direction = "column" justify = "space-evenly" alignItems = "center">
            <div id="text">
                <Fade bottom>
                <h1>WWII Aircraft Recognition</h1>
                <h6><i>Aviation made some massive advancements during WWII, how many do you know?</i></h6>
                </Fade>
            </div>
           <Fade bottom style={{ maxHeight: "120px"}}>
                <Grid item style={{ paddingTop: "30px"}}>
                    <Button className="fadeOnHover"  variant="contained" component={Link} to={"/leaderboard"}>Leaderboard</Button>
                </Grid>
                <Grid item style={{ paddingTop: "30px"}}>
                    <Button className="fadeOnHover" variant="contained" component={Link} to={"/game"}>Play Now!</Button>
                </Grid> 
            </Fade>
            </Grid>
            <br/>
            <br/>
            <br/>
            <Grid style={{ marginTop: this.state.mobileComp, display: this.state.disp, paddingTop: "20px", paddingBottom: "20px"}} container direction = "column" justify = "space-evenly" alignItems = "center" className="about-project">
                <Grid item className="header-italic"> {/*Header*/}
                    <Fade bottom>
                        <center>
                        <h1 style={{ fontSize: "2.7rem", backgroundColor: "rgba(196, 196, 196, 0.5)", maxWidth: "50vw"}}>About this Project</h1>
                        </center>
                    </Fade>
                </Grid>
                <Grid item>
                    <p className="about-para" style={{ textAlign: "center"}}> This project was created for Aviation History and Literature, Second Semester, for the 2020-2021 school year.
                        The object of the game is to recognize 10 aircraft as quickly as you can. The faster you recognize it, the more points you score.
                        Players with the most points will go up onto the Leaderboard. At the end of the game, you will get to see the planes you saw and learn a little about them.
                    </p>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <Footer disp={this.state.disp}/>
        </div>
           
        )
    }
}

export default Home