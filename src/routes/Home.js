import { useEffect, useState } from "react";
import DayCal from "components/DayCallendar";
import FriendCallendar from "components/FriendCallendar";
import "style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home({clientId,fId}){    
    const [friends,setFriends] = useState([]);
    const [calEm, setCalEm] = useState("");
    const [fIsTrue, setFIsTrue] = useState(false);

    useEffect(() => {
      if(fId.length > 0){
        setFIsTrue(true);
      }else{
        setFIsTrue(false);
      }
      renderFBts();
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
              {fIsTrue ? friends : null}
            </div>
            {fIsTrue ? <FriendCallendar frId = {calEm} /> : <div><h1>친구없음</h1></div>}           
            <FontAwesomeIcon onClick={() => {history.push("/profile");}} icon= {faRobot} size="3x" color = "black"/>
        </div>
    );
}
export default Home;