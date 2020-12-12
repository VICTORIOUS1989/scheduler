import React, { Fragment, useState , useEffect} from "react";
import axios from 'axios';
import DayList from './DayList'
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay ,getInterview, getInterviewersForDay} from 'helpers/selectors';

import "components/Application.scss";


export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const setDays = (days) => { setState(prev => ({ ...prev, days }));};

  const [state, setState] = useState({
    day: "",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers :{}
  });
  
      useEffect(() => {

      Promise.all([
        axios.get(`/api/days`).then((res) => res.data),
        axios.get(`/api/appointments`).then((res) => res.data),
        axios.get(`/api/interviewers`).then((res) => res.data)
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
      })
    }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}

      />
    );
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
                setDays={setDays}
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
