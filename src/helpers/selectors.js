let interviewers= {
  "1": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
}

export function getInterviewersForDay(state, day) {

  let interviewersArr = [];
	const [interviewersObj] = state.days.filter((data) => data.name === day);
	if (!interviewersObj) {
		return [];
	} else {
		const interviewers = interviewersObj.interviewers.filter(
			(id) => id === state.interviewers[id].id
		);
		interviewers.forEach((interviewerId) =>
    interviewersArr.push(state.interviewers[interviewerId])
		);
		return interviewersArr;
	}
}

export function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
	const [appointmentObj] = state.days.filter((data) => data.name === day);
	if (!appointmentObj) {
		return [];
	} else {
		const appointments = appointmentObj.appointments.filter(
			(id) => id === state.appointments[id].id
		);
		appointments.forEach((appointment) =>
			appointmentsForDay.push(state.appointments[appointment])
		);
		return appointmentsForDay;
	}
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}