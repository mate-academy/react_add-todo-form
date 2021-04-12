import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './todoList.scss';

export const TodoList = ({ todoList }) => (
  <div className="todoList">
    {todoList.map(todo => (
      <React.Fragment key={todo.id}>
        <span className="todoList__name">
          Name:
          {' '}
          <strong>{todo.user.name}</strong>
        </span>
        <div
          className={classNames(
            { todoList__completed: todo.completed },
            { todoList__failed: !todo.completed },
          )}
        >
          {todo.completed && <span>&#9745; </span>}
          {!todo.completed && <span>&#10008; </span>}
          {todo.title}
        </div>
      </React.Fragment>
    ))}
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
};
