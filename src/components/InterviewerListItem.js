import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  const InterviListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected 
  });



  return (
<li onClick={() => props.setInterviewer(props.name)}
    className={InterviListItemClass}
    >
  <img
    className="interviewers__item-image"
    src= {props.avatar}
    alt={props.name}
  />
</li>  );
}