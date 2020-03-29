import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ preparedTodos }) => (
  <div className="todos-list">
    {preparedTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
  </div>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf.isRequired,
};
