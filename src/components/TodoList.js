import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { TodoShape } from './TodoShape';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {
      todos.map(item => (
        <Todo key={item.id} todo={item} />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
