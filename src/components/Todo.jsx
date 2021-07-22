import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({
  userName,
  title,
  state,
}) => (
  <>
    <p>
      {title}
    </p>
    <p>
      <strong>Status: </strong>
      {state ? 'Completed' : 'Not completed yet'}
    </p>
    <p className="user">
      {userName}
    </p>
  </>

);

Todo.propTypes = {
  userName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
};
