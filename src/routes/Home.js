import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import DayCal from "components/DayCallendar";
import "style.css";

function Home(){    
    const friends = [];
    for(let i = 1; i < 8; i++){
      friends.push(<button className="friendsBt"></button>);
    }

    return(
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <Link to = "/profile">
                <button>My Profile</button>
            </Link>
            <div>
              {friends}
            </div>
            <div>
              <DayCal />
            </div>
        </div>
    );
}
export default Home;