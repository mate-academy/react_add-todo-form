import React from 'react';
import { TodoShape } from '../../shapes/TodoShape';
import { User } from '../User/User';

export const Todo = ({ title, completed, user }) => (
  <>
    <th>{title}</th>
    <User user={user} />
    <th>{completed ? 'Done' : 'Not yet'}</th>
  </>
);

Todo.propTypes = TodoShape;
