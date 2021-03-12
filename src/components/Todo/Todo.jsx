
import React from 'react';
import { TodoType } from '../../Types/types';

import { User } from '../User';
import './Todo.css';

export function Todo({ todo }) {
  return (
    <li className="App__item">
      {todo.title}
      <p className="App__text">{todo.completed.toString()}</p>
      <User user={todo.user} />
    </li>
  );
}

Todo.propTypes = {
  TodoType,
}.isRequired;
