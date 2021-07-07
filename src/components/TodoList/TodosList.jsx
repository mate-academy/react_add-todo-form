import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

export const TodosList = ({ todos }) => (
  <div className="todosList">
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>User</th>
          <th>User id</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(item => (
          <tr key={item.id}>
            <Todo {...item} />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
