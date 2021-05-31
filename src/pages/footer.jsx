import { Grid, Button, Typography } from "@material-ui/core"
import "./Styles.css"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Fade from "react-reveal"
var version = "1.0"
function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}
export default function Footer(props) {
    return (
        <Grid style={{ display: props.disp, textAlign: "center", paddingBottom: "20px" }} container direction="column" justify="space-evenly" alignItems="center" className="footer">
            <br/>
            <Fade bottom>
            <Button onClick={scrollToTop} style={{ color: "black", fontSize: "1.2rem", backgroundColor: "#c4c4c4"}}>
                <ArrowUpwardIcon/>
                Jump to Top
            </Button>
            <br/>
            <Typography>Programmed by Bryson Van Ryn for Aviation History and Literature - 2020-2021</Typography>
            <Typography>Research conducted by John Kimball and Bryson Van Ryn</Typography>
            <Typography>Something you want us to know? <a href="https://forms.gle/D46Yd8tXk6AgWJDc9">Let us know.</a></Typography>
            <Typography>Version {version}</Typography>
            <Typography>This website is open-source, so you can see the code. Of course you want to, click <a href="https://github.com/BrysonV10/aircraftrecgame">here.</a></Typography>
            </Fade>
        </Grid>
    )
}