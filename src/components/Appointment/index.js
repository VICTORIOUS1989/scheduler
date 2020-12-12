import React from "react";
import classnames from 'classnames';
import "components/Appointment/styles.scss";
import Header from  "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {student,time,interview,interviewers}= props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (   
    <article  className="appointment">
       <Header time={time}></Header>

       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer} />)}
        {mode === CREATE && 
        <Form interviewers={interviewers} onCancel={back} />}
        

    </article> 
    );
}
