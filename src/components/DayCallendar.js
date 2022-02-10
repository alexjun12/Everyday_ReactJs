import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Modal from 'react-modal';

function DayCallendar(){
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [events,addEvent] = useState([]);

  const [modalState, setModalState] = useState(false); // false->add / true->delete
  const [selectedEv, setSelectedEv] = useState(""); // event to delete or edit

  const [sctitle, setSctitle] = useState("");
  const [getY, setY] = useState(0);
  const [getMon,setMon] = useState(0);
  const [getD,setD] = useState(0);

    const addSchedule = (sy,sm,sd) => {
        const sched = {
          id : 0,
          title :  sctitle,
          allday : true,
          start : new Date(sy,sm,sd),
          end: new Date(sy,sm,sd),
        };
        addEvent(events.concat(sched));
    }
    const onChange = (event) => {
      setSctitle(event.target.value);
    }
    const deleteSchedule = (e) => { 
      for(let i = 0; i < events.length; i++){
        if(events[i].title === e){
          events.splice(i,1);
        }
      }
    }
    return(
      <div>
      <Calendar
        localizer={localizer}
        events={events}
        style = {{
          height : 1000,
          width : 1000,
        }}
        selectable
        onSelectSlot = {(e) => {
          setModalIsOpen(true);
          setModalState(false);
          setY(e.start.getUTCFullYear());
          setMon(e.start.getMonth());
          setD(e.start.getDate());
        }}
        onSelectEvent = {(e) => {
          setModalIsOpen(true);
          setModalState(true);
          setSelectedEv(e.title);
          console.log(selectedEv);
        }}
        startAccessor="start"
        endAccessor="end"
      />
      <Modal 
        style = {{
          overlay : {
            backgroundColor : "rgba(0,0,0,0.3)",
            zIndex : 4,
          },
          content : {
            height : 800,
            width : 500,
            left : 1100,
          }   
        }}
        isOpen = {ModalIsOpen}
        onRequestClose = {() => setModalIsOpen(false)}
      >{modalState ? 
        <div>
          <button onClick={() => deleteSchedule(selectedEv)}>Delete!!</button>
        </div> :
        <form onSubmit={(event) => {event.preventDefault();
          addSchedule(getY,getMon,getD)}}>
          <input type = "text" placeholder='Add Your Schedule' required onChange = {onChange} />
          <input type="submit" value = "Add Schedule" />
        </form>
        }
      </Modal>
      </div>
);}

export default DayCallendar;