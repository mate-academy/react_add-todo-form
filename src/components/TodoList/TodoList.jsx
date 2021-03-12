import PropTypes from 'prop-types';
import React from 'react';

import { Todo } from '../Todo';
import { TodoType } from '../../Types/types';

import './TodoList.css';

export function TodoList({ todos }) {
  return (
    <ul className="App__list">
      { todos.map(todo => (
        <Todo key={todo.id} todo={todo} />))
      }
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    TodoType.isRequired,
  ).isRequired,
};
