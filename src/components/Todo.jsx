import React from 'react';
import PropTypes from 'prop-types';

export function Todo({ title, name, completed }) {
  return (
    <>
      <div>{title}</div>
      {' '}
      <div><strong>{name}</strong></div>
      <div>
        status :
        {completed}
        ❌
      </div>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
