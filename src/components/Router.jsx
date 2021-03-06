import React from "react";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Intro from "routes/Intro";
import CreateAccount from "routes/CreateAccount";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom"

const AppRouter = ({isLoggedIn, clientId, fId, setFId}) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact path = "/">
                    <Home clientId = {clientId} fId = {fId}/>
                </Route>
                <Route exact path = "/profile">
                    <Profile clientId = {clientId} setFId = {setFId}/>
                </Route>                
                </>  
                ) : (
                <>
                <Route exact path = "/">
                     <Intro /> 
                </Route>     
                <Route exact path= "/auth">
                    <Auth />    
                </Route>       
                <Route exact path= "/createAccount">
                    <CreateAccount />    
                </Route>     
                </>
                )}
            </Switch>
        </Router>
    );
}

export default AppRouter;