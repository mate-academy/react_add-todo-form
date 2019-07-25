import React from 'react';
import PropTypes from 'prop-types';

function TodoList({ todos }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>To do task</th>
          <th>Completion</th>
        </tr>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.user.name}</td>
            <td>{todo.title}</td>
            <td className={todo.completed ? 'completed' : 'not-completed'}>
              {todo.completed ? 'Completed' : 'Not completed'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
