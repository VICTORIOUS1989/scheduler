
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers :{}
  });
  

  const setDay = day => setState({ ...state, day });

  const setDays = (days) => { setState(prev => ({ ...prev, days }));};
  useEffect(() => {

    Promise.all([
      axios.get(`/api/days`).then((res) => res.data),
      axios.get(`/api/appointments`).then((res) => res.data),
      axios.get(`/api/interviewers`).then((res) => res.data)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
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