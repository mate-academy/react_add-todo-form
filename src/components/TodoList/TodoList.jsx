import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';

export const TodoList = ({ usersTodos }) => (
  <ul className="list">
    {
      usersTodos.map(todo => (
        <li
          className="list__item"
          key={todo.id}
        >
          <div className="list__text">{todo.title}</div>
          <div className="list__text">{todo.user.name}</div>
          <div className="list__text">
            completed:
            {' '}
            {`${todo.completed}`}
          </div>
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  usersTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      todo: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
