import React from 'react';
import PropTypes from 'prop-types';
import { TodoPropsType } from '../TodoPropsType/TodoPropsType';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Task</th>
        <th>Completed</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <Todo {...todo} />
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.shape(TodoPropsType).isRequired,
};
