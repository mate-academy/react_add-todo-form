import PropTypes from 'prop-types';
import React from 'react';
import Todo from './Todo';
import './App.css';

const TodoList = ({ todos }) => (
  <table className="todo-list">
    <thead>
      <tr className="todo-list__row">
        <th>id</th>
        <th>Name</th>
        <th>Title</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
        />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
