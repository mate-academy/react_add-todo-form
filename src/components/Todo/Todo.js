import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import { UserType } from '../../types';

export const Todo = ({ title, completed, user }) => (
  <>
    <p>{`Title: ${title}`}</p>
    <p>{`Status: ${completed ? 'completed' : 'in progress'}`}</p>
    <User {...user} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserType.isRequired,
};
