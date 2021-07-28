import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
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
        <h4>Done</h4>
      ) : (
        <h4>In the process</h4>
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
