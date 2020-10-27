import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { TodoShape } from '../shapes/TodoShape';
import { Todo } from '../Todo';

export const TodoList = ({ todoList }) => (
  <ul className="TodoList">
    {
      todoList.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape(TodoShape)).isRequired,
};
