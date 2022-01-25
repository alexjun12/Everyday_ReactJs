import React, { useState } from "react";
import {Link} from "react-router-dom";

function Intro() {
    const [selectAuth, setselect] = useState(0);

    return (
        <div>
            <f1>EveryDay</f1>
            <Link to = "/createAccount" >
                <button >Create Account</button>
            </Link>
            <Link to = "/auth">
                <button>Sign In</button>
            </Link>
        </div>
    );
}
export default Intro;