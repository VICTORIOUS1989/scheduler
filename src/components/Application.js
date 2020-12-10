import React, { Fragment, useState , useEffect} from "react";
import axios from 'axios';
import DayList from './DayList'
import Appointment from "components/Appointment/index";

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const setDays = (days) => { setState(prev => ({ ...prev, days }));};

  const [state, setState] = useState({
    day: "",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
   // appointments: {}
  });
  
      useEffect(() => {
      const testURL = `http://localhost:8001/api/days`;
      axios.get(testURL).then(response => {
      //console.log([...response.data]);
      setDays(response.data);
    });
    }, [])

  const schedule = appointments.map(appointment => {
        return (
          <Appointment key={appointment.id} {...appointment} />
        );});
      
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
