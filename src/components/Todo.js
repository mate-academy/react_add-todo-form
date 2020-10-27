import React from 'react';
import { User } from './User';
import { TodoShape } from '../shapes/TodoShape';

export const Todo = ({ title, completed, user }) => (
  <div className="App__task">
    <div className="App__title">
      {title}
    </div>

    <div className="App__status">
      {completed ? `done` : `not done`}
    </div>

    <User {...user} />
  </div>
);

Todo.propTypes = TodoShape;
