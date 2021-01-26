import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../Types/types';
import { Todo } from './Todo/Todo';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <Todo {...todo} key={todo.id} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};
