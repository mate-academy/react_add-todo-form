import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ title }) => (

  <>
    {title}
  </>
);

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
};
