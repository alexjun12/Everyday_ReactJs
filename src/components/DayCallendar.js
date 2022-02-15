import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { dbService } from 'fbase';
import moment, { now } from 'moment';
import 'calEdit.css';
import "react-datepicker/dist/react-datepicker.css";
import "style.css";

import Modal from 'react-modal';
import ReactDatePicker from 'react-datepicker';

function DayCallendar({clientId}){
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [events,addEvent] = useState([]);

  const [modalState, setModalState] = useState(false); // false->add / true->delete
  const [selectedEv, setSelectedEv] = useState(""); // event to delete or edit

  const [sctitle, setSctitle] = useState("");

  const [startD, setStartDate] = useState(new Date(0,0,0));
  const [endD, setEndDate] = useState(new Date(0,0,0));
  const [dateClicked, setDateClicked] = useState(true);

  const nextId = useRef(1);

  const getMyCal = async () => {
    const dbEvents = await dbService.collection("events").get();
    dbEvents.forEach(document => {
      const gotDbEv = {
        id : document.data().id,
        title : document.data().title,
        start : new Date(parseInt(String(document.data().start.seconds) + "000")).toUTCString(),
        end : new Date(parseInt(String(document.data().end.seconds) + "000")).toUTCString(),
        dbId : document.id,
        clientId : clientId.uid,
      }
      addEvent((prev) => [gotDbEv, ...prev]);
    });
  };
  useEffect(() => {
    getMyCal();
  },[events]);

  const addSchedule = async () => {
      const cD = moment(endD);
      const neD = cD.clone().add(1,'days');
      const sched = {
        id : nextId.current,
        title :  sctitle,
        allday : true,
        start : startD,
        end : neD,
      };
      addEvent(events.concat(sched));
      nextId.current += 1;
      await dbService.collection("events").add({
        id : sched.id,
        title : sched.title,
        start : sched.start,
        end: new Date(neD),
      })
      setModalIsOpen(false);
  }
  const onChange = (event) => {
    setSctitle(event.target.value);
  }
  const deleteSchedule = async (e) => { 
    addEvent(events.filter((par) => par.id !== e.id));
    await dbService.doc(`events/${e.dbId}`).delete();
    setModalIsOpen(false);
  }
  const editSDay = async (d) => {
    setStartDate(d);
    addEvent(events.map((sched) => sched.id === selectedEv.id ? {... sched, start : d} : sched));
    await dbService.doc(`events/${selectedEv.dbId}`).update({
      start : d
    });
  }
  const editEDay = async (d) => {
    const cD = moment(d);
    const neD = cD.clone().add(1,'days');
    setEndDate(new Date(neD));
    addEvent(events.map((sched) => sched.id === selectedEv.id ? {... sched, end : neD} : sched));
    await dbService.doc(`events/${selectedEv.dbId}`).update({
      end : new Date(neD)
    });
  }
  return(
    <div className='calBorder'>
    <Calendar    
      className='calDes'
      localizer={localizer}
      events={events}
      selectable
      onSelectSlot = {dateClicked ? (e) => {          
        setDateClicked(false);
        setStartDate(e.start);
      } : (e) => {
        setModalIsOpen(true);
        setModalState(false);
        setDateClicked(true);
        setEndDate(e.start); 
      }}
      onSelectEvent = {(e) => {
        setModalIsOpen(true);
        setModalState(true);
        setSelectedEv(e);
      }}
    />
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
    >{modalState ? 
      <div>
        <button onClick={() => deleteSchedule(selectedEv)}>Delete!!</button>
        <form>
          <ReactDatePicker onChange = {(date) => editSDay(date)} selected = {new Date(selectedEv.start)} dateFormat = "yyyy년 MM월 dd일"/>
          <ReactDatePicker onChange = {(date) => editEDay(date)} selected = {new Date(selectedEv.end)} dateFormat = "yyyy년 MM월 dd일"/>
        </form>
      </div> :
      <form onSubmit={(event) => {event.preventDefault();
        addSchedule()}}>
        <input type = "text" placeholder='Add Your Schedule' required onChange = {onChange} />
        <input type="submit" value = "Add Schedule" />
      </form>
      }
    </Modal>
    </div>
);}

export default DayCallendar;