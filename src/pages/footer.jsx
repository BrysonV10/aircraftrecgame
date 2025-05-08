import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./Styles.css"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
var version = "2.0a"
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
           
            <Button onClick={scrollToTop} style={{ color: "black", fontSize: "1.2rem", backgroundColor: "#c4c4c4"}}>
                <ArrowUpwardIcon/>
                Jump to Top
            </Button>
            <br/><br/>
            <Typography>Programmed by Bryson Van Ryn for Aviation History and Literature - 2020-2021</Typography>
            <Typography>Research conducted by John Kimball and Bryson Van Ryn</Typography>
            <Typography>Version {version}</Typography>
            <Typography>This website is open-source, so you can see the code. Of course you want to, click <a href="https://github.com/BrysonV10/aircraftrecgame">here.</a></Typography>
        </Grid>
    )
}