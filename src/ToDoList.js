import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './ToDoItem';

const ToDoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

ToDoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ToDoList;
