import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

function TodoItem(props) {
  const { todo } = props;

  return (
    <tr>
      <td className="item-title">{todo.title}</td>
      <td className="item-user"><User user={todo.user} /></td>
      <td className="item-status">
        {todo.completed ? 'Completed' : 'In progress'}
      </td>
    </tr>

  );
}

TodoItem.defaultProps = {
  todo: {},
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf(),
};

export default TodoItem;
