import React, { useState } from 'react'
import Button from "components/Button"; 
import InterviewerList from "components/InterviewerList";

export default function Confirm(props) {
  const {name,interviewers,interviewer,onSave,onCancel}= props;
  const [formName, setName] = useState(name || "");
  const [formInterviewer, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset= () => {
    setName("");
    setInterviewer(null);
  }
  const cancel= () => {
    reset();
    onCancel();
  }

  function validate() {
    if (formName === "") {
      setError("student name cannot be blank");
      return;
    }
   /* if (formInterviewer === null) {
      setError("Please select an interviewer");
      return;
    }*/
    setError("");
    onSave(formName, formInterviewer);
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
              value={formName ? formName : ''}
              data-testid="student-name-input"

              /*
                This must be a controlled component
              */
            />
          </form>
          <section className="appointment__validation">{error}</section>

          <InterviewerList interviewers={interviewers} value={formInterviewer ? formInterviewer : '' }  onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button onClick={event => cancel()} danger>Cancel</Button>
            <Button onClick={event => validate()} confirm>Save</Button>
          </section>
        </section>
      </main> 
);
}