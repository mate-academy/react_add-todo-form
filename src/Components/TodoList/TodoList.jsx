import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo'

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {
      todos.map(
        todo => <Todo key={todo.id} {...todo}/>
      )
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number.isRequired,
      }
    ),
  ).isRequired,
}
