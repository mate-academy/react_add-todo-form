import React from 'react';
import propTypes from 'prop-types';
import Todo from './Todo';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <table className="table-list">
    <thead>
      <tr className="table-list--row">
        <th className="table-list--item">ID</th>
        <th className="table-list--item">Title</th>
        <th className="table-list--item">Completed</th>
        <th className="table-list--item">User</th>
      </tr>
    </thead>
    <tbody>
      {
        todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))
      }
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: propTypes.shape({
    id: propTypes.number,
  }).isRequired,
};

export default TodoList;
