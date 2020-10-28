import React from 'react';
import { ShapeTodoItem } from '../Shapes/Shapes';
import './TodoItem.css';

export const TodoItem = (props) => {
  const { name, done, id, userId } = props.item;
  const decoration = (!done) ? 'none' : 'line-through';
  const background = (!done) ? '#e9cbd7' : '#cfe4d7';

  return (
    <li className="TodoItem" style={{ backgroundColor: background }}>
      <span>
        {id}
        .
      </span>
      <input
        checked={done}
        type="checkbox"
        onChange={() => props.flag(id)}
      />
      <p style={{ textDecoration: decoration }}>{name}</p>
      <p>
        UserID:
        &nbsp;
        {userId}
      </p>
    </li>
  );
};

TodoItem.propTypes = ShapeTodoItem.isRequired;
