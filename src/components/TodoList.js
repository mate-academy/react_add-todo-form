import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  todos.map(todo => (
    <Todo {...todo} key={todo.id} />
  ))
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
};
