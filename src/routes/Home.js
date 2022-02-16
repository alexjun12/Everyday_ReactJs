import {Link} from "react-router-dom";
import "style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

function Home({clientId}){    
    const friends = [];
    for(let i = 1; i < 8; i++){
      friends.push(<button className="friendsBt" key = {`fb ${i}`}></button>);
    }

    return(
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <div>
              {friends}
            </div>
            <div>
            </div>
            <Link to = "/profile" clientId = {clientId}>
              <FontAwesomeIcon icon= {faRobot} size="3x" color = "black"/>
            </Link>
        </div>
    );
}
export default Home;