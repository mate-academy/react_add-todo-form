import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <>
    <h3>
      {title}
    </h3>
    <p>
      {completed ? (
        <p>Done</p>
      ) : (
        <p>In process</p>
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
