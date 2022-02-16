import { authService, firebaseInstance, dbService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "style.css";

function CreateAccount() {
    const [email,setEmail] = useState(""); 
    const [password,setPassword] = useState(""); 
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {target: {name,value}} = event;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value); 
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data = await authService.createUserWithEmailAndPassword(email, password);
        }catch(error){
            alert(error.message);
        }     
    }
    const onSocialClick = async(event) => {
        const {target:{name},
        } = event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }
    const history = useHistory();
    authService.onAuthStateChanged((user) => {
        if(user){
          history.push("/profile");
        }
    });
    return (
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <form onSubmit={onSubmit}>
                <input name = "email" type = "email" placeholder="Email" required value = {email} onChange={onChange} className="form__input"/>
                <input name = "password" type = "password" placeholder="Password" required value = {password} onChange ={onChange} className="form__input"/>
                <input type = "submit" value = "CreateAccount" className="confirmBT"/>
            </form>
            <div>
                <button onClick = {onSocialClick} name = "google" className="googleBt"></button>
                <button onClick = {onSocialClick} name = "github" className="githubBt"></button>
            </div>
        </div>
    );
}
export default CreateAccount;