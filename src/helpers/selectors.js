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