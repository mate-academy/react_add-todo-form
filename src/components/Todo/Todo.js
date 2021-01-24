import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({ user, title, completed }) => (
  <>
    <td className="table__row table__row--user">
      <User {...user} />
    </td>
    <td className="table__row table__row--task">
      {title}
    </td>
    <td className="table__row">
      {(completed) ? 'Completed \u2713' : 'Uncompleted \u2717'}
    </td>
  </>
);

Todo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
