import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';
import './TodoList.css';

export function TodoList({ todoList }) {
  return (
    <div className="field">
      <ul className="data-list">
        {todoList.map(todo => (
          <li key={todo.id} className="data-li">
            <User {...todo.user} />
            <p><u className="title">{todo.title}</u></p>
            <h3 className="status">{` Status: ${todo.completed}`}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
