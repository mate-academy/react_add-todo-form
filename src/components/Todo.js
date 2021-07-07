import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ id, title, user }) => (
  <>
    <hr />
    <p>
      N
      {` ${id}`}
    </p>
    <p>{title}</p>
    <p>{user.name}</p>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
