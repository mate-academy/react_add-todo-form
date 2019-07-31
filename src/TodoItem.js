import React from 'react';
import propTypes from 'prop-types';

const TodoItem = ({ todo, id }) => (
  <tr>
    <td>
      {id}
    </td>
    <td>
      {todo.title}
    </td>
    <td>
      <div>{todo.user.name}</div>
    </td>
    <td>
      <label htmlFor="checked">
        <input
          name="checked"
          type="checkbox"
          checked={todo.completed}
        />
      </label>
    </td>
  </tr>
);

TodoItem.propTypes = {
  id: propTypes.number.isRequired,
  todo: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
  }).isRequired,
};

export default TodoItem;
