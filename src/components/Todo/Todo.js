import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

export const Todo = ({ userName, title, completed }) => (
  <>
    <span>{userName}</span>
    <span>{title}</span>
    <span>
      <input
        type="checkbox"
        value={completed}
      />
    </span>
  </>
);

Todo.defaultProps = {
  userName: '',
};

Todo.propTypes = {
  userName: PropTypes.string,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
