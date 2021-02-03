import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, id, name }) => (
  <li key={id}>
    <h2>{title}</h2>
    <p>{name}</p>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
