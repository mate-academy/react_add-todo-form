import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ id, title, userId }) => (
  <>
    <span>{`${id} - ${title}`}</span>
    <span>{` user Id: ${userId}` }</span>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
