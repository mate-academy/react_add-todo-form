import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Todo.css';

const Todo = ({ title, completed, author }) => (
  <li className="todo-item">
    <h3>{`Task: ${title}`}</h3>
    <p
      className={classnames({
        status: true,
        completed,
      })}
    >
      {completed ? 'completed' : 'not completed'}
    </p>
    <p>{`User: ${author.name}`}</p>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
