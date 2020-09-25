import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ id, title, user }) => (
  <li>
    <div>{`id: ${id}`}</div>
    <div>{`todo: ${title}`}</div>
    <div>{`user id: ${user.id}`}</div>
    <div>{`name: ${user.name}`}</div>
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
};

Todo.defaultProps = {
  user: {},
};
