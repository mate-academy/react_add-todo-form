import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

import { TodoType } from '../../types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (

  <div className="TodoList">
    {todos.map(todo => (
      <Todo key={todo.id} todo={todo} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};
