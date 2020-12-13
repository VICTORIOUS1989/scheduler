import React from "react";
import classnames from 'classnames';
import "components/Appointment/styles.scss";
import Header from  "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  
    
  const {student,time,interview,interviewers}= props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then( (res) => {
      console.log(res);
      transition(SHOW);
     })
    //;
  }


  return (   
    <article  className="appointment">
       <Header time={time}></Header>
       {mode === SAVING && (
        <Status message={SAVING}/>
      )}
       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
           student={student}
          interviewer={interview}/>)}
        {mode === CREATE && 
        <Form interviewers={interviewers} onCancel={back} onSave={save} />}
        

    </article> 
    );
}
