import React from 'react';
import PropTypes from 'prop-types';
import { TypeToDo } from '../../types';

import { ToDo } from '../ToDo/ToDo';

export const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <td>Task</td>
        <td>User</td>
        <td>Status</td>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <ToDo key={todo.id} todo={todo} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TypeToDo).isRequired,
};
