import React from 'react';
// import { User } from '../User/User';
import './TodoItem.css';
import { TodoItemShape } from './TodoShape';

export function TodoItem({ todo }) {
  const { user, id, title, completed } = todo;

  return (
    <li
      className={
        (completed)
          ? 'task--done'
          : 'task--not-done'
      }
    >
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
