import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TodoTypes } from '../../types';
import { User } from '../User';

export const Todo = ({ todo }) => (
  <tr className={
    classNames('list', {
      'table-success': todo.completed,
    })
  }
  >
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'Done ✔️' : 'In process ⏳'}</td>
    <td><User user={todo.user} /></td>
  </tr>
);

Todo.propTypes = PropTypes.shape(TodoTypes).isRequired;
