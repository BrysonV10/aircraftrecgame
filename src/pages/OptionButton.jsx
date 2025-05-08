import React from "react"
import Button from '@mui/material/Button';


class OptionButton extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {}
        
    }
    
    handleClick(){
        this.props.handler(this.props.correct);
    }

    render(){
        if(this.props.color == "blue"){
            var gradient = "linear-gradient(180deg, #2F00ED, #35247D)";
        } else if(this.props.color == "yellow"){
            var gradient = "linear-gradient(180deg, #CDD10A, #835817)";
        } else if(this.props.color == "green"){
            var gradient = "linear-gradient(180deg, #00AD07, #1C551E)"
        } else if(this.props.color == "red") {
            var gradient = "linear-gradient(180deg, #F40707, #5E1414)";
        }
        if(this.props.show){
            var text = this.props.name;
        } else {
            var text = " "
        }
        return (
            <center>
                <Button onClick={this.handleClick} className="question-button" style={{ color: "white", backgroundImage: gradient, fontSize: "1.2rem" }}>
                    {text}
                </Button>
            </center>
        )
    }
}

export default OptionButton