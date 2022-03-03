import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DayCal from "components/DayCallendar";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese } from "@fortawesome/free-solid-svg-icons";
import { dbService } from 'fbase';
import {addDoc, collection, setDoc, doc} from "firebase/firestore";

function Profile({clientId, setFId}) {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [authes, setAuthes] = useState([]);
    const [friends, setFriends] = useState([]);
    const [frChanged, setFrChanged] = useState(false);
    const [addOk,setAddOk] = useState(false);
    
    const addAuthes = async () => {
      const addAuth = {
        Email : clientId,
      };
      await setDoc(doc(dbService, "Authes", clientId),addAuth);
    }
    const getFriend = async () => {
      setFId([]);
      const dbEvents = await dbService.collection("users").doc(clientId).collection("friends").get();
      dbEvents.forEach(document => {
        const gotDbFr = {
          Email : document.data().Email,
        }
        setFId((prev) => [gotDbFr, ...prev]);
        });
      }
      useEffect(() => {
        addAuthes();
        getFriend();
      },[frChanged]);

    const addFriend = async () => {
      if(friends === dbService.collection("Authes").doc(friends).id){
        setAddOk(true);
      }
      if(addOk === true){//여기
        const fMake = {
          Email : friends,
        };
        await addDoc(collection(dbService, `users/${clientId}/friends/`),fMake);
        if(frChanged === false){
            setFrChanged(true);
          }else{
            setFrChanged(false);
          }
          setAddOk(false);
          alert("Friend Added!!");
      }
      else{
        alert("그런친구없음~!0");
      }
  }
  const history = useHistory();
  const onLogOutClick = () => {
      authService.signOut();
      history.push("/");
  }
  const onChange = (event) => {
      setFriends(event.target.value);
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