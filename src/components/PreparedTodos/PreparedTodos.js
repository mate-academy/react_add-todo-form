import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { TodoShapes } from '../../Shapes';

export const Todos = ({ todos }) => (
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>
          Completed
        </th>
        <th>
          Task
        </th>
        <th>
          UserId
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(item => (
        <tr key={item.id} className="table-active">
          <Todo todo={item} />
        </tr>
      ))}
    </tbody>
  </table>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(
    TodoShapes,
  ).isRequired,
};
