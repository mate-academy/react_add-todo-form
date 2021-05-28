import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <strong>Todo: </strong>
    {`${title} `}
    <strong>Status: </strong>
    {`${completed} `}
    <strong>Name: </strong>
    <User {...user} />
  </>
);

Todo.defaultProps = {
  title: '',
  completed: '',
  user: '',
};

Todo.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape(),
};
