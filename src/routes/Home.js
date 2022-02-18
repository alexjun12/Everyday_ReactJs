import { useEffect, useState } from "react";
import { dbService } from 'fbase';
import "style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home({clientId, fId}){    
    const friends = [];
    const frBts = [];
    
    const addFriend = async () => {
      friends.push(fId);
      await dbService.collection(clientId.uid).doc("friends").set({
        friends : fId,
      });

      console.log(friends);
      //for(let i = 0; i < friends.length; i++){
        //frBts.push(<button className="friendsBt" key = {`fb ${i}`}></button>);
      //}
    }
    useEffect(() => {
      addFriend();
    },[]);
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