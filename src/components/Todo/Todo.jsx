import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <div className="box">
    <h1 className="title">
      {`${title[0].toUpperCase()}${title.substring(1)}`}
    </h1>
    {completed
      ? <p className="completed">Status: Completed!</p>
      : <p className="notCompleted">Status: Not completed yet</p>}
    <p className="subtitle">{user}</p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
