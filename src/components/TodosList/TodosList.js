import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { TypeTodo } from '../../types';

export const TodosList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo {...todo} key={todo.id} />
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
};
