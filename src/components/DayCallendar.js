import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Modal from 'react-modal';

function DayCallendar(){
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [ModalIsOpen, setModalIsOpen] = useState(false);

    const events = [
        {
          title: 'event 1',
          start: '2021-06-14T10:00:00',
          end: '2021-06-14T12:00:00',
        },
    ];
    return(
      <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
      <Modal 
        isOpen = {ModalIsOpen}
        onRequestClose = {() => setModalIsOpen(false)}
      >
      modal content</Modal>
      </div>
);}

export default DayCallendar;