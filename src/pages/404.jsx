import React from "react"
import {Link} from "react-router-dom"
import "./Styles.css"
import ImageFadeIn from "react-image-fade-in"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Fade} from "react-reveal"
class NotFound extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imageOP: 0,
            imageDisp: "none"
        }
    }

    componentDidMount(){
        for(let i = 0; i <= 100; i++){
            setTimeout(() => {
                this.setState({imageOP:i/100})
            }, 10)
            
        }
        
        
    }
    render(){
        return (
        <div>
            
           <div id="bg-contain" >
               <ImageFadeIn className="bg" src={"https://firebasestorage.googleapis.com/v0/b/wwiiplanesrec.appspot.com/o/wwiihome.jpg?alt=media&token=b6b4d518-76a2-4482-9ff6-2845eabee219"} />
           </div>
           <Grid className="text-contain" container direction = "column" justify = "space-evenly" alignItems = "center">
           <div id="text">
               <Fade bottom>
               <h1>404 Not Found</h1>
               </Fade>
               <h6><i>The page you were looking for was not found. Please try again.</i></h6>
           </div> 
                <Grid item style={{ paddingTop: "30px"}}>
                    <Button className="fadeOnHover"  variant="contained" component={Link} to={"/"}>Home</Button>
                </Grid> 
            </Grid>

            
        </div>
           
        )
    }
}
export default NotFound