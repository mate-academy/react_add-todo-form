import React from 'react';
import './Todo.css';

import { TodoType } from '../../types';
import { User } from '../User/User';

export const Todo = ({ title, completed, user }) => (
  <>
    <User {...user} />
    <td>{title}</td>
    <td className="todo_completed">{`${completed ? 'yes' : 'no'}`}</td>
  </>
);

Todo.propTypes = TodoType;
