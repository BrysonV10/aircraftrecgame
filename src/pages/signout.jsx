import firebase from "./firebase.js"
import "firebase/auth"

export default function SignOut(props){
    firebase.auth().signOut().then(() => {
        let signedout = true
    }).catch((err) =>{
        let signedout = false
        return (
            <h1>Error: {err}</h1>
        )
    })
    return (
        <>
        {props.moveTo}
        </>
    )
}