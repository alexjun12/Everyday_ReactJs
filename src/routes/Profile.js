import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DayCal from "components/DayCallendar";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheese } from "@fortawesome/free-solid-svg-icons";

function Profile({clientId, setFId}) {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const onChange = (event) => {
        setFId(event.target.value);
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
                setModalIsOpen(false);
                alert("Friend Added!!");
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