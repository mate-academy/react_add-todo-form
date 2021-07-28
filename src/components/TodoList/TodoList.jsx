import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';
import { TodoType } from '../../types';

export const TodoList = ({ preparedTodos }) => (
  <div className="todos">
    {preparedTodos.map(todo => (
      <Todo {...todo} key={todo.id} />
    ))}
  </div>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    TodoType,
  ).isRequired,
};
