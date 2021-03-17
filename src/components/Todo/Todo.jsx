import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../../types';

export const Todo = ({ title, user, status }) => (
  <>
    <h3>{user.name}</h3>
    <p>
      title:
      {' '}
      {title}
    </p>
    <p>
      status:
      {`${status}`}
    </p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: UserType.isRequired,
  status: PropTypes.bool.isRequired,
};
