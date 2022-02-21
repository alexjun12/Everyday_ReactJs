import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { dbService } from 'fbase';
import moment, { now } from 'moment';
import {addDoc, collection} from "firebase/firestore";
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

  const [evChanged, setEvChanged] = useState(false);

  const getMyCal = async () => {
    addEvent([]);
    const dbEvents = await dbService.collection("users").doc(clientId).collection("events").get();
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
    getMyCal();
  },[evChanged]);

  const addSchedule = async () => {
      const cD = moment(endD);
      const neD = cD.clone().add(1,'days');
      const addEvs = {
        title : sctitle,
        start : startD,
        end: new Date(neD),
      };
      await addDoc(collection(dbService, `users/${clientId}/events/`),addEvs);
      if(evChanged === false){
        setEvChanged(true);
      }else{
        setEvChanged(false);
      }
      setModalIsOpen(false);
  }
  const onChange = (event) => {
    setSctitle(event.target.value);
  }
  const deleteSchedule = async (e) => { 
    addEvent(events.filter((par) => par.dbId !== e.dbId));
    await dbService.doc(`users/${clientId}/events/${e.dbId}`).delete();
    setModalIsOpen(false);
  }
  const editSDay = async (d) => {
    setStartDate(d);
    addEvent(events.map((sched) => sched.dbId === selectedEv.dbId ? {... sched, start : d} : sched));
    await dbService.doc(`users/${clientId}/events/${selectedEv.dbId}`).update({
      start : d
    });
  }
  const editEDay = async (d) => {
    const cD = moment(d);
    const neD = cD.clone().add(1,'days');
    setEndDate(new Date(neD));
    addEvent(events.map((sched) => sched.dbId === selectedEv.dbId ? {... sched, end : neD} : sched));
    await dbService.doc(`users/${clientId}/events/${selectedEv.dbId}`).update({
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