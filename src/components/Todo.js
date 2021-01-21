import React from 'react';
import { typeTodo } from '../types';
import User from './User';
import './Todo.scss';

const Todo = ({ todo }) => (
  <li className="item" key={todo.id}>
    <h2>{`Task: ${todo.title}`}</h2>
    <User user={todo.user} />
    <p>
      status:

      <span className={todo.completed ? 'complete' : 'incopmlete'}>
        {` ${todo.completed ? 'complete' : 'incopmlete'}`}
      </span>
    </p>
  </li>
);

Todo.propTypes = {
  todo: typeTodo.isRequired,
};

export default Todo;
