import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import './Todo.css';

const Todo = ({ title, completed, user }) => (
  <>
    <div className="todoItem">
      <User {...user} />
      <h1 className="title">
        {title}
      </h1>
      <p className={completed ? 'completed' : 'in-progress'}>
        {completed ? '✓' : '✗'}
      </p>
    </div>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
