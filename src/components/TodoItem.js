import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (

  <tr className="todoItem">
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td><User user={todo.user} /></td>
    <td>
      <label htmlFor="radio">
        <input
          id="radio"
          type="checkbox"
          defaultChecked={todo.completed}
        />
      </label>
    </td>
  </tr>

);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default TodoItem;
