import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';
import { TodoShape } from '../shapes/TodoShape';

import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
