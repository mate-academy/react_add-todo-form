import React from 'react';
import PropTypes from 'prop-types';

import { User } from '../User';

export function Todo({ id, title, completed, user, handler }) {
  return (
    <div className="todo">
      <span>{title}</span>
      <span>
        {completed ? (
          <button type="button" onClick={() => handler(id)}>
            <span role="img" aria-label="done">✔️</span>
          </button>
        ) : (
          <button type="button" onClick={() => handler(id)}>
            <span role="img" aria-label="not-done">❌</span>
          </button>
        )}
      </span>
      <User {...user} />
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handler: PropTypes.func.isRequired,
};
