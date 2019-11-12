import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

export default function TodoItems(props) {
  return (
    <tr>
      <td>{props.todo.title}</td>
      <td className={props.todo.completed ? 'active' : 'non-active'}>
        {props.todo.completed ? 'true' : 'false'}
      </td>
      {<User user={props.todo.user} />}
    </tr>
  );
}

TodoItems.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};
