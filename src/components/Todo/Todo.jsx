import React from 'react';
import { TodoType } from '../../types';

export const Todo = ({ title, user }) => (
  <li className="box">
    <span className="is-size-4">{user.name}</span>
    <br />
    {title}
  </li>
);

Todo.propTypes = TodoType.isRequired;
