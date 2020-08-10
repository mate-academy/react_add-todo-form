import React from 'react';
import PropTypes from 'prop-types';

const Todo = props => (
  <p>
    {props.title.length < 40
      ? props.title
      : `${props.title.slice(0, 37)}...`}
    {` `}
    <span style={{ color: 'red' }}>
      {props.completed ? 'done' : 'not completed'}
    </span>
    {` `}
    <span style={{ color: 'green' }}>
      {props.username}
    </span>
  </p>
);

export default Todo;

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};
