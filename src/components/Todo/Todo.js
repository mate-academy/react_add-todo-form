import React from 'react';
import { TodoShape } from './TodoShape';
import { User } from '../User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="App__list">
    <div>
      <strong>
        Task
      </strong>
      {' : '}
      {title}
      <User {...user} />
    </div>
    <div>
      {completed
        ? <div className="App__positive" />
        : <div className="App__negative" />
      }
    </div>
  </div>
);

Todo.propTypes = TodoShape;
