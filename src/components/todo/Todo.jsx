import React from 'react';
import { User } from '../user';
import './Todo.scss';
import { TodoShape } from '../shapes/ToDoShape';

export const Todo = ({ title, completed, user }) => (
  <div className="todos__todo todo">
    <h3 className="todo__title">
      {'Task: '}
      {title}
    </h3>

    <div className="todo__description">
      <User {...user} />

      {completed
        ? <b className="todo__status--done">Completed</b>
        : <b className="todo__status--not-done">Not Completed</b>}
    </div>
  </div>
);

Todo.propTypes = TodoShape;
