import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { TodoTypes } from '../../types';

export const TodoList = ({ prepared }) => (
  <table className="table table-bordered table-success table-hover">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Completed</th>
        <th scope="col">User</th>
      </tr>
    </thead>
    <tbody>
      {prepared.map(todo => (
        <tr key={todo.id}>
          <Todo todo={todo} />
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  prepared: PropTypes.arrayOf(TodoTypes).isRequired,
};
