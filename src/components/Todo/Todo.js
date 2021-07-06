import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ title, completed, userName }) => (
  <>
    <span className="todo-list__key">Name</span>
    :&nbsp;
    <span style={{ fontStyle: 'italic' }}>{title}</span>
    <br />
    <label>
      <span className="todo-list__key">Completed</span>
      :&nbsp;
      <input type="checkbox" defaultChecked={completed} />
    </label>
    <br />
    <span className="todo-list__key">User</span>
    :&nbsp;
    <span className="todo-list__username">{userName}</span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
