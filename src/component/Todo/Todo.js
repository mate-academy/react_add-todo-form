import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, status, id }) => (
  <>
    {title}
    <input id={id} type="checkbox" onChange={status} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
