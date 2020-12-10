import React from "react";
import classnames from 'classnames';
import "components/Appointment/styles.scss";
import Header from  "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {

  const {student,time,interview}= props

  return (   
    <article  className="appointment">
       <Header time={time}></Header>
       {interview == null ? <Empty/> : 
       <Show
       student={interview.student}
       interviewer={interview.interviewer}/>}
    </article> 
    );
}
