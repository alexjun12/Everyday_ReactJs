import React from "react";
import {Link} from "react-router-dom";

function Home(){
    return(
        <div>
            <Link to = "/profile">
                <button>My Profile</button>
            </Link>
        </div>
    );
}
export default Home;