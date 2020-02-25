import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <table className="todo-list">
    <thead className="todo-list__head">
      <tr>
        <th className="todo-list__cell">#</th>
        <th className="todo-list__cell">Todo</th>
        <th className="todo-list__cell">Status</th>
        <th className="todo-list__cell">User Id</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(item => <Todo key={item.id} item={item} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
