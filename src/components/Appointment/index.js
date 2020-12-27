import React from "react";
import classnames from 'classnames';
import "components/Appointment/styles.scss";
import Header from  "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

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

  const {student,time,interview,interviewers,cancelInterview,bookInterview,editInterview}= props

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

  const onEdit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition("SAVING");
    editInterview(props.id, interview)
      .then(() => transition("SHOW"))
      .catch((error) => transition("ERROR_SAVE", true));
  };

  return (   
    <article  className="appointment" data-testid="appointment" >
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
         onSave={onEdit} />} 

      {mode === DELETING && <Status message="Deleting..." />}

      {mode === ERROR_DELETE && (
        <Error message={"Could not delete appointment"} onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not book appointment"} onClose={back} />
      )}

    </article> 
    );
}
