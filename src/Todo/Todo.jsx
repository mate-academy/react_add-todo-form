import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, name, userId }) => (
  <>
    <td className="todo__item">{title}</td>
    <td className="todo__item">{name}</td>
    <td className="todo__item">{userId}</td>
  </>
);

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
