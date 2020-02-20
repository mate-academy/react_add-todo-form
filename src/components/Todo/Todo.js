import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import 'bulma';
import './Todo.scss';

export const Todo = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <tr className="tr">
      <td className="td">{id}</td>
      <td className="td">{title}</td>
      <User user={user} />
      <td className={completed ? 'yes' : 'no'}>
        {completed ? 'YES' : 'NO'}
      </td>
    </tr>
  );
};

const objectTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

Todo.propTypes = {
  todo: PropTypes.shape(objectTypes).isRequired,
};
