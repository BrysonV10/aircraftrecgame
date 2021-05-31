import React from "react"
import {Grid} from "@material-ui/core"
import "./Styles.css"

class Plane extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        
        return (
            <>
                <Grid style={{ width: "85vw"}} item container className="planeComp" direction="row" justify="space-evenly" alignItems="center" spacing={3}>
                    <Grid item xs={3} className="imgContainerEnd">
                        <img alt={this.props.data.name} src={this.props.data.img} className="planeImgEnd"/>
                    </Grid>
                    <Grid item xs={9}>
                        <h6>{this.props.data.name}</h6>
                        <p>{this.props.data.description}</p>
                        <i>Image from {this.props.data.imgsrc}</i>
                    </Grid>
                </Grid>
                <br/>
            </>
        )
    }
}

export default Plane