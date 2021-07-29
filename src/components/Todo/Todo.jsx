import React from 'react';
import { TodoPropsType } from '../TodoPropsType/TodoPropsType';

export const Todo = ({ title, completed, user }) => (
  <>
    <td>
      {title}
    </td>
    <td>
      {completed ? 'Yes' : 'No'}
    </td>
    <td>
      {user.name}
    </td>
  </>
);

Todo.propTypes = TodoPropsType;
