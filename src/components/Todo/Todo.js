import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todos }) => (
  <>
    {todos.map(todo => (
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td>{todo.userId}</td>
      </tr>
    ))}
  </>
);

Todo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};

export default Todo;
