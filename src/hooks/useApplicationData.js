
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

   return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then( () => {
        setState({
          ...state,
          appointments
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
  
      return axios
        .delete(`http://localhost:8001/api/appointments/${appointmentId}`)
        .then( () => {
          setState({
            ...state,
            appointments
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