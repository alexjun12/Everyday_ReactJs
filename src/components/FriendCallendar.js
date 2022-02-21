import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { dbService } from 'fbase';
import moment, { now } from 'moment';
import 'calEdit.css';
import "react-datepicker/dist/react-datepicker.css";
import "style.css";

function FriendCallendar({frId}){
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [events,addEvent] = useState([]);
  const [firCh, setFirCh] = useState(false);
  const getMyCal = async () => {
    addEvent([]);
    const dbEvents = await dbService.collection("users").doc(frId).collection("events").get();
    dbEvents.forEach(document => {
        const gotDbEv = {
          title : document.data().title,
          start : new Date(parseInt(String(document.data().start.seconds) + "000")).toUTCString(),
          end : new Date(parseInt(String(document.data().end.seconds) + "000")).toUTCString(),
          dbId : document.id,
        }   
        addEvent((prev) => [gotDbEv, ...prev]);
    });
  }
  useEffect(() => {
    if(firCh === true){
        getMyCal();
    }
    setFirCh(true);
  },[frId]);
  
  return(
    <div className='calBorder'>
    <Calendar    
      className='calDes'
      localizer={localizer}
      events={events}
    />
    </div>
);
}
export default FriendCallendar;