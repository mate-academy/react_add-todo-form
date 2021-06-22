import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, userName, id }) => (
  <div id={id} className="Todo">
    <em>
      {userName}
    </em>
    <h1>
      {title}
    </h1>
  </div>
);

Todo.propTypes = {
  userName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
