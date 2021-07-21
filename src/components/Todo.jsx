import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({
  userName,
  todoTitle,
  todoState,
}) => (
  <>
    <p>
      {todoTitle}
    </p>
    <p>
      <strong>Status: </strong>
      {todoState ? 'Completed' : 'Not completed yet'}
    </p>
    <p className="user">
      {userName}
    </p>
  </>

);

Todo.propTypes = {
  userName: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  todoState: PropTypes.bool.isRequired,
};
