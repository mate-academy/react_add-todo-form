import React from 'react';
import PropTypes from 'prop-types';

import { User } from '../User/User';

export const Todo = ({
  id,
  user,
  title,
  completed,
}) => (
  <>
    <User user={user} />
    <h3>{title}</h3>
    <p>{completed ? 'Completed' : 'In progress'}</p>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

Todo.defaultProps = {
  completed: false,
};
