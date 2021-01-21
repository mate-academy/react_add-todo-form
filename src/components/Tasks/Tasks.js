import React from 'react';
import PropTypes from 'prop-types';

import { UserTypes } from '../Shapes/ShapesTypes';

export const Tasks = ({ todoList, toggle }) => (
  <div>
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
  </div>
);

Tasks.propTypes = {
  todoList: PropTypes.arrayOf(
    UserTypes,
  ).isRequired,
  toggle: PropTypes.func.isRequired,
};
