import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <div className="todos-list">
    {todos.map(todo => (
      <div key={todo.id} className="todos-list__item">
        <Todo {...todo} />
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      user: PropTypes.object.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
