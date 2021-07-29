import React from 'react';
import PropTypes from 'prop-types';

export const List = ({ todo }) => {
  const { title, name, completed } = todo;

  return (
    <>
      <p>{title}</p>
      <p>{name}</p>
      <p>{completed ? 'Completed' : 'Not Completed'}</p>
    </>
  );
};

List.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
