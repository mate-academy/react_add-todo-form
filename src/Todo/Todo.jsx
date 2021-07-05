import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, name, id }) => (
  <>
    <td className="todo__item">{id}</td>
    <td className="todo__item">{title}</td>
    <td className="todo__item">{name}</td>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
