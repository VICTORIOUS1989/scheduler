import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";


export default function DayListItem(props) {

  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected ,
    "day-list__item--full": props.spots===0
  });

  return (
    <li onClick={() => props.setDay(props.name)}
    className={DayListItemClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}