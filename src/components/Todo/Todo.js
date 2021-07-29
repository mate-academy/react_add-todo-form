import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export function Todo({ title, user }) {
  return (
    <div>
      <h2>
        {title}
      </h2>

      <User {...user} />
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
