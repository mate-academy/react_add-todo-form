import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './Todo.scss';

export const Todo = ({ title, completed, user }) => (
  <>
    <h4 className="todo__title">
      {title}
    </h4>
    <div
      className={ClassNames(
        'todo__completed',
        { ' todo__completed-done': completed },
        { ' todo__completed-notDone': !completed },
      )}
    />
    <p>
      {user.name}
    </p>
  </>
);

Todo.defaultProps = {
  completed: false,
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};
