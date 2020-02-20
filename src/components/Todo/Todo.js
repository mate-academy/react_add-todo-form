import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, user, id }) => (
  <>
    <span>{`ID: ${id}`}</span>
    <h4 className="title">{`Task: ${title}`}</h4>
    <p>{user.name}</p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
