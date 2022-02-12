import React, { useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { dbService } from 'fbase';
import moment, { now } from 'moment';
import 'calEdit.css';
import "react-datepicker/dist/react-datepicker.css";
import "style.css";

import Modal from 'react-modal';
import ReactDatePicker from 'react-datepicker';

function DayCallendar(){
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

    const addSchedule = async () => {
        const cD = moment(endD);
        const neD = cD.clone().add(1,'days');
        const sched = {
          id : nextId.current,
          title :  sctitle,
          allday : true,
          start : startD,
          end: neD,
        };
        addEvent(events.concat(sched));
        nextId.current += 1;
        await dbService.collection("events").add({
          
        })
        setModalIsOpen(false);
    }
    const onChange = (event) => {
      setSctitle(event.target.value);
    }
    const deleteSchedule = (e) => { 
      addEvent(events.filter((par) => par.title !== e.title));
      setModalIsOpen(false);
    }
    const editSDay = (d) => {
      setStartDate(d);
      addEvent(events.map((sched) => sched.id === selectedEv.id ? {... sched, start : d} : sched));
    }
    const editEDay = (d) => {
      const cD = moment(d);
      const neD = cD.clone().add(1,'days');
      setEndDate(d);
      addEvent(events.map((sched) => sched.id === selectedEv.id ? {... sched, end : neD} : sched));
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
            <ReactDatePicker onChange = {(date) => editSDay(date)} selected = {startD} dateFormat = "yyyy년 MM월 dd일"/>
            <ReactDatePicker onChange = {(date) => editEDay(date)} selected = {endD} dateFormat = "yyyy년 MM월 dd일"/>
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