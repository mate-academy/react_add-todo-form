import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => <Todo key={todo.id} {...todo} />)}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
