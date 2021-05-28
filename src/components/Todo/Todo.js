import React from 'react';
import PropTypes from 'prop-types';

import { User } from '../User';

export function Todo({ title, completed, user }) {
  return (
    <div className="todo">
      <p>
        User name
        {' : '}
        <User {...user} />
      </p>
      <h2>{title}</h2>
      <p>
        Status
        {' : '}
        {completed
          ? `Done`
          : `Not done`}
      </p>
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};
