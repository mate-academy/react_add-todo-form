import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>What to do?</th>
          <th>is completed?</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <Todo {...todo} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
