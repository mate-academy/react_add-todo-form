import PropTypes from 'prop-types';
import React from 'react';
import User from './User';

const TodoItem = ({ todo }) => {
  const status = (todo.completed) ? 'done' : 'in progress';

  return (
    <tr className="row">
      <td className="rowOfTasks">{todo.id}</td>
      <td className="rowOfTasks">{todo.title}</td>
      <User user={todo.user} />
      <td className="rowOfTasks">{status}</td>
    </tr>
  );
};

TodoItem.propTypes = { todo: PropTypes.objectOf(PropTypes.any).isRequired };

export default TodoItem;
