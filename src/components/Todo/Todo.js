import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import 'bulma';
import './Todo.scss';

export const Todo = ({ todo, idx }) => {
  const { title, completed, user } = todo;

  return (
    <tr className="tr">
      <td className="td">{idx + 1}</td>
      <td className="td">{title}</td>
      <User user={user} />
      <td className={completed ? 'yes' : 'no'}>
        {completed ? 'YES' : 'NO'}
      </td>
    </tr>
  );
};

export const todoTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

Todo.propTypes = {
  todo: PropTypes.shape(todoTypes).isRequired,
  idx: PropTypes.number.isRequired,
};
