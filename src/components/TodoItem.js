import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  const { title, completed: isCompleted } = props.todo;
  const { name } = props.todo.user;

  return (
    <tr>
      <td>{title}</td>
      <td>{name}</td>
      <td>{`${isCompleted}`}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.instanceOf(Array).isRequired,
};

export default TodoItem;
