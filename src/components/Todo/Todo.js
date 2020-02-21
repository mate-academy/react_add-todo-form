import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.css';

export const Todo = ({ todo: { title, user } }) => (
  <>
    <p className="todo__title">{title}</p>
    <User user={user} />
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
