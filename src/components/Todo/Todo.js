import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ userName, title, completed }) => (
  <>
    <td className="table__row table__row--user">
      {userName}
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
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
