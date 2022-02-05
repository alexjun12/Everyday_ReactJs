import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function DayCallendar({day}){
    const events = [
        {
          id: 1,
          title: 'event 1',
          start: '2021-06-14T10:00:00',
          end: '2021-06-14T12:00:00',
        },
        {
          id: 2,
          title: 'event 2',
          start: '2021-06-16T13:00:00',
          end: '2021-06-16T18:00:00',
        },
        { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
      ];

    return(
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay new',
        }}
        customButtons={{
            new: {
              text: 'new',
              click: () => alert('new event'),
            },
        }}
        events = {events}
        eventColor="red"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
);}

export default DayCallendar;