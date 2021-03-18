import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import { Todo } from '../Todo/Todo';
import { TodoType } from '../../types';

export const TodoList = ({ todos }) => (
  <ol className="list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <Todo
          title={todo.title}
          user={todo.user}
          status={todo.completed}
        />
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};

TodoList.defaulProps = {
  todos: [],
};
