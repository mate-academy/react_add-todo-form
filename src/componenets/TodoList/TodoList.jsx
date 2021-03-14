import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.scss';

export const TodoList = ({ preparedTodos }) => (
  <>
    {preparedTodos.map(toDoObj => (
      <Todo {...toDoObj} key={toDoObj.id} />
    ))}
  </>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
