import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

const Todo = ({ title, completed, user }) => {
  const status = (completed)
    ? 'done'
    : 'not completed yet';

  return (
    <>
      <h2>
        {title}
      </h2>
      <p>
        {`Status: ${status}`}
      </p>
      <User user={user} />
    </>
  );
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default Todo;
