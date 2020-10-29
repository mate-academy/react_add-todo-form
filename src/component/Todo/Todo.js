import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/userShape';

const Todo = ({ title, user, completed }) => (
  <div className="card text-white bg-dark mb-3 mr-3 w-25">
    <div className="card-header">{user.name}</div>
    <div className="card-body">
      <p className="card-text">
        Todo:
        {' '}
        {title}
      </p>

      <label
        className="form-check-label"
      >
        <input
          type="checkbox"
          className="form-check-input"
          checked={completed}
          readOnly
        />
        {completed ? 'Done' : 'In process'}
      </label>
    </div>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape(UserShape).isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
