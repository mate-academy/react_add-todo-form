import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ activity }) => (
  <>
    <p>
      {activity.completed ? '🗸' : '✗'}
      {' '}
      {activity.title}
    </p>
    <p>
      <User user={activity.user} />
    </p>
  </>
);

Todo.propTypes = {
  activity: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }),
  ),
};

Todo.defaultProps = {
  activity: [],
};
