import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DayCal from "components/DayCallendar";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faUserPlus, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
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
        alert("No Id like that~!");
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
            <div>
              <FontAwesomeIcon className="pageChangeBt" onClick={() => {history.push("/");}} icon= {faAddressBook} size="3x" color = "white"/>
              <FontAwesomeIcon className="restBt" onClick={() => setModalIsOpen(true)} icon= {faUserPlus} size="3x" color = "white"/>
              <FontAwesomeIcon className="restBt" onClick={onLogOutClick} icon= {faRightFromBracket} size="3x" color = "white"/>
            </div>
            <h1 className="mTitle">EveryDay</h1>
            <DayCal clientId = {clientId}/>
            <Modal 
                style = {{
                overlay : {
                backgroundColor : "rgba(0,0,0,0.3)",
                zIndex : 4,
            },
            content : {
              height : 50,
              width : 300,
              top: 200,
              left : 670,
              borderRadius: 30,
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
            
        </div>
    );
}
export default Profile;