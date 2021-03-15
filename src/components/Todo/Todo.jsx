import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title }) => {
  return (
    <p>
      title: {title}
    </p>
  )
}

Todo.propTypes = {
  title: PropTypes.string.isRequired
}
