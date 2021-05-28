import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <>
    <h2 className="title">
      {title}
    </h2>
    <p className="status">
      {completed ? (
        <span className="status__true">True</span>
      ) : (
        <span className="status__false">False</span>
      )}
    </p>
    <User {...user} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
