import React from 'react';
import { ShapeTodoItem } from '../Shapes/Shapes';
import './TodoItem.css';

export const TodoItem = (props) => {
  const decoration = (!props.state) ? 'none' : 'line-through';
  const background = (!props.state) ? 'aliceblue' : '#cfe4d7';

  return (
    <li className="TodoItem" style={{ backgroundColor: background }}>
      <input
        checked={props.state}
        type="checkbox"
        onChange={() => props.flag(props.index)}
      />
      <p style={{ textDecoration: decoration }}>{props.item}</p>
    </li>
  );
};

TodoItem.propTypes = ShapeTodoItem.isRequired;
