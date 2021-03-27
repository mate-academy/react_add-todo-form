import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <>
    <User user={user} />
    {' '}
    <span className="title">{title}</span>
    <span>
      {completed
        ? <span role="img" aria-label="good">&#128077;</span>
        : <span role="img" aria-label="bad">&#128078;</span>}
    </span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
