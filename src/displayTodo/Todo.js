import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

const Todo = ({ completed, title, user, setCompleted, id }) => (
  <li className="list">
    <div>
      <input
        type="checkbox"
        defaultChecked={completed}
        onChange={event => setCompleted(event, id)}
      />
      <span className="text">
        {title[0].toUpperCase() + title.slice(1)}
      </span>
    </div>
    <User {...user} />
  </li>
);

export { Todo };

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
