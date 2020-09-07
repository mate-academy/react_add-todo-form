import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { User } from '../User';
import { Todo } from '../Todo';

export const TodoList = ({ list }) => {
  const listHtml = list.map(todo => (
    <li key={todo.id} className={`completed-${todo.completed}`}>
      <User name={todo.user.name} />
      <Todo todo={todo} />
    </li>
  ));

  return (
    <ul>{listHtml}</ul>
  );
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
