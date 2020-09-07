import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/index';

export const Todo = ({ user, title, completed, id }) => (
  <>
    <p>
      <User user={user} />
    </p>
    <p>
      {title}
    </p>
    <p>
      {id}
    </p>
    <p>
      {(completed) ? 'completed' : 'not completed'}
    </p>

  </>
);

Todo.propTypes = {
  user: PropTypes.shape().isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
