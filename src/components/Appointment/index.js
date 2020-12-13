import React from "react";
import classnames from 'classnames';
import "components/Appointment/styles.scss";
import Header from  "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const DELETING = "DELETING";

  const {student,time,interview,interviewers,cancelInterview,bookInterview}= props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(props.id, interview)
    .then( (res) => {
      transition(SHOW);
     })
     .catch(error => transition(ERROR_SAVE,true) );
    //;
  }


  const cancel= () => {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));

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
          interviewer={interview}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
          />
          )}
        {mode === CREATE && 
        <Form interviewers={interviewers} onCancel={back} onSave={save} />}
        
        {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={cancel}
          onCancel={back}
        /> )}

      {mode === EDIT && 
        <Form 
        name={student}
        interviewer={interview.id}
        interviewers={interviewers}
         onCancel={back} 
         onSave={save} />} 
        {mode === DELETING && <Status message="Deleting..." />}


    </article> 
    );
}
