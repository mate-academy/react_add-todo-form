import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';

export const TodoList = ({ todoList }) => (
  <ul className="todoList">
    {todoList.map(todo => (
      <li key={todo.id} className="todoList__todo">
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};

TodoList.defaultProps = {
  todoList: [],
};
