import React from 'react';
// import { User } from '../User/User';
import './TodoItem.css';
import { TodoItemShape } from './TodoShape';

export function TodoItem({ todo, changeTaskStatus }) {
  const { user, id, title, completed } = todo;

  return (
    <li
      className={
        (completed)
          ? 'task--done'
          : 'task--not-done'
      }
    >
      <input
        type="checkbox"
        name="checkbox"
        className="checkbox"
        checked={completed}
        onChange={() => changeTaskStatus(id)}
      />
      <strong>{`${id} ${title}`}</strong>

      <br />
      {`is ${
        (completed)
          ? 'Done'
          : 'Not done'
      } by `}
      <span className="user-name">{user.name}</span>
    </li>
  );
}

TodoItem.propTypes = TodoItemShape;
