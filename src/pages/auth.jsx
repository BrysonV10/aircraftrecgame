import React from "react"
import {Navigate} from "react-router-dom"



class Auth extends React.Component {
    render() {
        return (
            <Navigate replace to="/game" />
        )
    }
}


export default Auth