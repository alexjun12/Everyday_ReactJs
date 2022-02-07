import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { relativeTimeRounding } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Modal from 'react-modal';

function DayCallendar(){
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [events,addEvent] = useState([]);
  let getYear;
  let getMonth;
  let getDay;
    const addSchedule = (sy,sm,sd) => {
        const sched = {
          id : 0,
          title : 'aasd',
          allday : true,
          start : new Date(sy,sm,sd),
          end: new Date(sy,sm,sd),
        };
        addEvent(events.concat(sched));
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
          console.log(e.start.getUTCFullYear(),e.start.getMonth() + 1,e.start.getDate());
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
      >
        <button onClick={() => addSchedule(2022,1,7)}>Add Schedule</button>
      </Modal>
      </div>
);}

export default DayCallendar;