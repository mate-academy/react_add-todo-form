import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const Todo = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>
      <input
        className=""
        onChange={() => {}}
        type="checkbox"
        defaultChecked={todo.completed}
      />
    </td>
    <td className="task-column">{todo.title}</td>
    <td className="name-column">
      <User user={todo.user} />
    </td>
  </tr>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

export default Todo;
