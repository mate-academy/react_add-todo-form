import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './Todoitem';

const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>USER</th>
        <th>DONE</th>
        <th>TASK</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
