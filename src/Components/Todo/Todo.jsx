import React from 'react';
import { PreparedTodosType } from '../../types/PreparedTodosTypes';
import { User } from '../User';
import './Todo.css';

export const Todo = ({ task }) => (
  <div className="card todo">
    <h4 className="card-title">
      task:
      <strong>{task.title.toUpperCase()}</strong>
    </h4>
    <User task={task} />
    <p>
      id:
      <i>{task.id}</i>
    </p>
    <p className="taskCard__status">
      Status:
      {` ${task.completed ? 'finished' : 'in progress'}`}
    </p>
  </div>
);

Todo.propTypes = PreparedTodosType.isRequired;
