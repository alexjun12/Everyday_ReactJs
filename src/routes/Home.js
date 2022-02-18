import { useEffect, useState } from "react";
import DayCal from "components/DayCallendar";
import "style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home({clientId,fId}){    
    const [friends,setFriends] = useState([]);
    const [calEm, setCalEm] = useState("");

    useEffect(() => {
      renderFBts();
      setCalEm(fId[0].Email);
    },[]);

    const renderFBts = () => {
      for(let i = 0; i < fId.length; i++){
        setFriends((prev) => [<button id = {fId[i].Email} className ="friendsBt" key = {i} onClick = {fCalChange}></button>, ...prev]);
      }
    }

    const fCalChange = (e) => {
      setCalEm(e.target.id);
    }
    const history = useHistory();
    return(
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <div>
              {friends}
            </div>
            
            <div>
            </div>
            <FontAwesomeIcon onClick={() => {history.push("/profile");}} icon= {faRobot} size="3x" color = "black"/>
        </div>
    );
}
export default Home;