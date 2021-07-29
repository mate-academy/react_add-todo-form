import React from 'react';
import { TodoProps } from '../TodoProps';

export const Todo = ({ user, title, completed }) => (
  <div>
    <h2>{user.name}</h2>
    <p>{title}</p>
    <p>{completed ? 'Completed' : 'In progress' }</p>
  </div>
);

Todo.propTypes = TodoProps;
