import React from "react";

import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

/**
 * Returns the Interviewer List of a form
 * @param {} param0 
 */
export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => props.onChange(interviewer.id)}
      selected={props.value === interviewer.id}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
