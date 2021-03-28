import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';
import {User} from '../User/User';

export const Todo = ({
  title,
  user,
}) => (
  <div className="card">
    <User user={user} />
    <h2><span>Title:</span> {title}</h2>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}
