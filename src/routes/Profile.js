import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DayCal from "components/DayCallendar";

function Profile({clientId}) {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <div>
            <h1 className="mTitle">EveryDay</h1>
            <DayCal clientId = {clientId}/>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
export default Profile;