import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from './propsVars';

export function TodoList({ todoList }) {
  return (
    <ul className="ui centered cards">
      { todoList.map(({ id, title, completed, user }) => (
        <li key={id} className="ui grey fluid card">
          {`${user.name} (UserId:${user.id})`}
          <br />
          {title}
          <br />
          {'status:  '}
          {completed ? 'Done' : 'In Progress' }
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: userShape.isRequired,
  })).isRequired,
};
