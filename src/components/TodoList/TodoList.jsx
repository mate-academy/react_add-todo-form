import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { todoShape } from '../PropTypes';

export const TodoList = ({ todos }) => (
  <div className="todolist">
    {todos.map(todo => <Todo key={todo.id} {...todo} />)}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoShape).isRequired,
};
