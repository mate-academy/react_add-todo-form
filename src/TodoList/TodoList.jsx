import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = React.memo(
  ({ todos }) => (
    <table className="todo">
      <thead>
        <tr className="todo__head-row">
          <th className="todo__heading">Todo</th>
          <th className="todo__heading">User</th>
          <th className="todo__heading">UserId</th>
        </tr>
      </thead>
      <tbody className="todo__body">
        {todos.map(todo => (
          <tr className="todo__row" key={todo.id}>

            <Todo {...todo} />
          </tr>
        ))}
      </tbody>
    </table>
  ),
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
