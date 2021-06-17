import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function Todo({ todos }) {
  return (
    <div>
      <ul>
        <li>{todos.title}</li>
        <li>{todos.completed ? 'complete' : 'is not complete'}</li>
        <li>
          {' '}
          <User user {...todos.user} />
        </li>
      </ul>
    </div>
  );
}

Todo.propTypes = {
  todos: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default Todo;
