import React, { Fragment, useState , useEffect} from "react";
import axios from 'axios';
import DayList from './DayList'
import Appointment from "components/Appointment/index";
import useApplicationData from "../hooks/useApplicationData";

import { getAppointmentsForDay ,getInterview, getInterviewersForDay} from 'helpers/selectors';

import "components/Application.scss";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview
  } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day)
    if(interview){
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview.interviewer}
          student={interview.student}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          editInterview={editInterview}

    
        />
      );  
    }
    else{
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={null}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}

        />
      );
    }
});
    
  return (
    <main className="layout">
      <section className="sidebar">
       
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
            <DayList
                days={state.days}
                day={state.day}
                setDay={setDay}
              />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
