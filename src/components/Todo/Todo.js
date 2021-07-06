import React from 'react';
import { TodoProps } from '../../props/TodoProps';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <div className="card mb-3">
    <h3 className="card-header">{title}</h3>
    <div className="card-body">
      <blockquote className="blockquote mb-0 d-flex justify-content-around">
        <User {...user} />
        <span className="card bg-primary text-white px-2">
          {completed ? 'done' : 'in process'}
        </span>
      </blockquote>
    </div>
  </div>
);

Todo.propTypes = TodoProps;
