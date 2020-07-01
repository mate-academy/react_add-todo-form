import React from 'react';
import PropTypes from 'prop-types';

import { NewTodoTypes } from '../Shape/ShapeTypes';

export const NewTodo = ({ todoList, toggle }) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">Status</th>
        <th scope="col">Title</th>
        <th scope="col">User ID</th>
      </tr>
    </thead>
    <tbody>
      {todoList.map(todo => (
        <tr
          className={todo.completed ? 'table-success' : 'table-danger'}
          key={todo.id}
        >
          <th scope="row">
            <input
              type="checkbox"
              checked={todo.completed}
              value={todo.id}
              onChange={toggle}
            />
          </th>
          <td>{todo.title}</td>
          <td>{`User id ${todo.userId}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

NewTodo.propTypes = {
  todoList: PropTypes.arrayOf(
    NewTodoTypes,
  ).isRequired,
  toggle: PropTypes.func.isRequired,
};
