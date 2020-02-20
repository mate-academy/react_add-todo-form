import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ currentTodo, person }) => (
  <tr>
    <td className="table__data">{currentTodo.id}</td>
    <td className="table__data">{currentTodo.title}</td>
    <td className="table__data">{person.name}</td>
  </tr>
);

Todo.propTypes = {
  currentTodo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  person: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
