import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ title, user }) => (
  <div className="Todo">
    <h3 style={{ color: 'brown' }}>{title}</h3>
    <p>task for:</p>
    <h4 style={{ color: 'brown' }}>{user.name}</h4>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
