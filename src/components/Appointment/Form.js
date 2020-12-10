import React, { useState } from 'react'
import Button from "components/Button"; 
import InterviewerList from "components/InterviewerList";

export default function Confirm(props) {
  const {name,interviewers,interviewer,onSave,onCancel}= props;
  const [formName, setName] = useState(name || "");
  const [formInterviewer, setInterviewer] = useState(props.interviewer || null);

  const reset= () => {
    setName("");
    setInterviewer(null);
  }
  const cancel= () => {
    reset();
    onCancel();
  }

  return (  
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              onChange={event => setName(event.target.value)}
              value={formName}
              /*
                This must be a controlled component
              */
            />
          </form>
          <InterviewerList interviewers={interviewers} value={formInterviewer}  onChange={setInterviewer}/>
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={event => cancel()} danger>Cancel</Button>
            <Button onClick={onSave} confirm>Save</Button>
          </section>
        </section>
      </main> 
);
}