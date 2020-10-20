import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ preparedList }) => {
  return (
    <ul className="list">
      {preparedList.map(todo => (
        <li key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  preparedList: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
