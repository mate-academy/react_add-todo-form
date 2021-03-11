import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import className from 'classnames';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <div className="todos">
    {todos.map(todo => (
      <div
        className={className(todo.completed ? 'completed' : 'active')}
        key={todo.id}
      >
        <Todo {...todo} />
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
