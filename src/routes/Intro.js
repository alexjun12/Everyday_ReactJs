import React, { useState } from "react";
import {Link} from "react-router-dom";
import "style.css";

function Intro() {
    const [selectAuth, setselect] = useState(0);

    return (
        <div>
            <h1 className="textCenter">EveryDay</h1>
            <Link to = "/createAccount" >
                <button className="button-55">Create Account</button>
            </Link>
            <Link to = "/auth">
                <button className="button-55">Sign In</button>
            </Link>
        </div>
    );
}
export default Intro;