
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers :{}
  });
  

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => { setState(prev => ({ ...prev, days }));};
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      const days=all[0].data;
      const appointments=all[1].data;
      const interviewers=all[2].data;
      setState(prev => {
           return {...prev, days ,appointments, interviewers };
      });

    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  //    const interviewer = getInterview(state, interview);
     // Decrement spots
     const days = [...state.days];
     for (let dayIndex in days) {
       let day = days[dayIndex];
       if (day.appointments.includes(id)) {
         const newDay = { ...day, spots: day.spots - 1 };
         days[dayIndex] = newDay;
       }
     }
   return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then( () => {
        setState({
          ...state,
          appointments,
          days
        });
   //      return interviewer;
      })
      .catch( () => {
        console.log('ERROR')
      })
    }


    const cancelInterview = (appointmentId) => {
      const prev = {  ...state }
      const appointment = {
        ...state.appointments[appointmentId], 
        interview: null
      };  
      const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
      };
      
   // Increment spots
   const days = [...state.days];
   for (let dayIndex in days) {
     let day = days[dayIndex];
     if (day.appointments.includes(appointmentId)) {
       const newDay = { ...day, spots: day.spots + 1 };
       days[dayIndex] = newDay;
     }
   }
      return axios
        .delete(`http://localhost:8001/api/appointments/${appointmentId}`)
        .then( () => {
          setState({
            ...state,
            appointments,
            days
          });
        })
        .catch( () => {
          setState({...prev})
        })
    } 

    return {
      state,
      setDay,
      bookInterview,
      cancelInterview,
    };
  }