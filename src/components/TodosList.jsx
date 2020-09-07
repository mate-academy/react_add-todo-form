import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import './TodosList.css';

export const TodosList = ({ todosArray }) => (
  <div className="list">
    {todosArray.map(todo => <Todo key={todo.id} {...todo} />)}
  </div>
);
TodosList.propTypes = {
  todosArray: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }),
  ).isRequired,
};
