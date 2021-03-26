import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../../types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <h1>
      {title}
    </h1>
    <span>
      {completed ? '✔️' : '❌'}
    </span>
    <User user={user} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: UserType.isRequired,
};
