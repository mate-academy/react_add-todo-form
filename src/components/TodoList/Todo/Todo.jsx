import React from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';

import { User } from './User';

export function Todo({ title, completed, user }) {
  return (
    <>
      <User {...user} />
      <h2 className="todo-list__title">{title}</h2>
      <p className="todo-list__status">
        {completed
          ? `+`
          : `X`}
      </p>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};
