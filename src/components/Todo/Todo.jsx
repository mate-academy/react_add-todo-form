import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ status, name, task }) => (
  <tr>
    <td>{task}</td>
    <td>{name}</td>
    <td>{status ? 'Completed' : 'In progress'}</td>
  </tr>
);

Todo.propTypes = {
  status: PropTypes.bool,
  task: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Todo.defaultProps = {
  status: false,
};
