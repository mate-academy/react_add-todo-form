import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './Todo.css';

const Todo = ({ title, user }) => (
  <>
    <h3 className="todo__title">
      {title}
    </h3>
    <User user={user} />
  </>
);

export default Todo;

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
};
