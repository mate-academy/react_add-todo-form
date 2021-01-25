import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import TodoType from '../type';

const TodoList = ({ prepared }) => (
  <ul>
    {prepared.map(item => (
      <li key={item.id}>
        <Todo {...item} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  prepared: PropTypes.arrayOf(
    PropTypes.shape(TodoType).isRequired,
  ).isRequired,
};

export default TodoList;
