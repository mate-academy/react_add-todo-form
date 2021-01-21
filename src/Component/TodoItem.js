import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todos }) {
  return (
    <tbody>
      {todos.map(todo => (
        <tr>
          <td className="table__item">{todo.id}</td>
          <td className="table__item">{todo.title}</td>
          <td className="table__item">{todo.user.name}</td>
        </tr>
      ))}
    </tbody>
  );
}

TodoItem.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};

export default TodoItem;
