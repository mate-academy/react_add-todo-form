import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ title, completed, userName }) => (
  <>
    <td>{title}</td>
    <td>{userName}</td>
    <td>
      <input type="checkbox" value={completed} className="checkbox" />
    </td>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
