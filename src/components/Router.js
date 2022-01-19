import React from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import {HashRouter as Router, Route, Switch} from "react-router-dom"

export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact path = "/">
                    <Home />
                </Route>
                </>  
                ) : (
                <Route exact path = "/">
                     <Auth /> 
                </Route>
                )}
            </Switch>
        </Router>
    );
}