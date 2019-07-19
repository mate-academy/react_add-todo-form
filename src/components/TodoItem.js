import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = (props) => {
  const { todo, handleTogle } = props;

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleTogle(todo)}
        />
      </td>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.user.username}</td>
      <td>{todo.user.id}</td>
      <td>{todo.user.email}</td>
    </tr>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
  handleTogle: PropTypes.func.isRequired,
};

export default TodoItem;
