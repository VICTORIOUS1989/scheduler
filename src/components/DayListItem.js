import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";


export default function DayListItem(props) {

  const formatSpots= function(spots){
  if (spots === 0) return "no spots remaining";
  if (spots === 1) return "1 spot remaining";
  if (spots === 2) return "2 spots remaining";
  return spots;
  }

  const DayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected ,
    "day-list__item--full": props.spots===0
  });

  return (
    <li onClick={() => props.setDay(props.name)}
    className={DayListItemClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}