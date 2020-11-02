import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <ul className="ui card">
    {
      todos.map(todo => (
        <Todo {...todo} key={todo.id} />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf().isRequired,
};
