import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todoTitle, name, id }) => (
  <>
    <td className="todo__item">{todoTitle}</td>
    <td className="todo__item">{name}</td>
    <td className="todo__item">{id}</td>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  todoTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
