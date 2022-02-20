import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DayCal from "components/DayCallendar";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese } from "@fortawesome/free-solid-svg-icons";
import { dbService } from 'fbase';

function Profile({clientId, setFId}) {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [friends, setFriends] = useState([]);
    const [frChanged, setFrChanged] = useState(false);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const onChange = (event) => {
        setFriends(event.target.value);
    }

    const getFriend = async () => {
        setFriends([]);
        setFId([]);
        const dbEvents = await dbService.collection(clientId).get();
        dbEvents.forEach(document => {
          if(document.id.substring(0,7) === "friends"){
            const gotDbFr = {
                Email : document.data().Email,
            }
            setFriends((prev) => [gotDbFr, ...prev]);
            setFId((prev) => [gotDbFr, ...prev]);
          }
        });
      }

      useEffect(() => {
        getFriend();
      },[frChanged]);

    const addFriend = async () => {
      if(friends === dbService.collection){//여기
        await dbService.collection(clientId).doc(`friends${new Date().getMilliseconds()}`).set({
          Email : friends,
        });
        if(frChanged === false){
            setFrChanged(true);
          }else{
            setFrChanged(false);
          }
          alert("Friend Added!!");
      }
      else{
        alert("그런친구없음~!0");
      }
    }
    return (
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <DayCal clientId = {clientId}/>
            <button onClick={onLogOutClick}>Log Out</button>
            <button onClick={() => setModalIsOpen(true)}>Add Friend</button>
            <Modal 
                style = {{
                overlay : {
                backgroundColor : "rgba(0,0,0,0.3)",
                zIndex : 4,
            },
                content : {
                height : 300,
                width : 300,
                left : 1100,
            }     
            }}
            isOpen = {ModalIsOpen}
            onRequestClose = {() => setModalIsOpen(false)}
            ><form onSubmit={(event) => {
                event.preventDefault();
                addFriend();
                setModalIsOpen(false);
            }}>
                <input type = "text" placeholder="Email" required onChange={onChange} />
                <input type = "submit" value = "Add Friend" />
            </form>
            </Modal>
            <div>
                <FontAwesomeIcon onClick={() => {history.push("/");}} icon= {faCheese} size="3x" color = "black"/>
            </div>
        </div>
    );
}
export default Profile;