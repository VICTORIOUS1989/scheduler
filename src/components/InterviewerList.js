import React from "react";

import "components/InterviewerList.scss"

import InterviewerListItem from "components/InterviewerListItem";

/**
 * Returns the Interviewer List of a form
 * @param {} param0 
 */
export default function InterviewerList(props){

  let {interviewers,value,onChange }= props;
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{
        interviewers = interviewers.map(interviewer =>
            <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer = {event => {onChange(interviewer.id)}}
      />
        )
      }
    </ul>
  </section>
  );
}

