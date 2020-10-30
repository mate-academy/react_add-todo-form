import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { todoType } from '../propTypes/todoType';

import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="container">

    <ul className="list-group todos mx-auto text-light">
      {todos.map(todo => (
        <li key={todo.id}>
          <Todo
            title={todo.title}
            user={todo.user}
            completed={todo.completed}
          />
        </li>
      ))}
    </ul>

  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoType).isRequired,
};
