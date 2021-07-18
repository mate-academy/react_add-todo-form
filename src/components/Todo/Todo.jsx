import React from 'react';
import './Todo.scss';
import PropTypes from 'prop-types';
import avatar from '../../images/img_avatar.png';

export function Todo({ title, user, completed }) {
  return (
    <div className="card">
      <img
        src={avatar}
        alt="Avatar"
      />
      <div className="container">
        <h3>
          Name:
          {' '}
          {user.name}
        </h3>
        <h4>
          Task:
          {' '}
          {title}
        </h4>
        <p>
          Status:
          {' '}
          {completed ? 'Done' : 'Not done'}
        </p>
      </div>
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
