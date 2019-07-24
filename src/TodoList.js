import React from 'react';

 import TodoItem from './TodoItem';
 import './todoList.css'

 const TodoList = ({ todos }) => (
  <table className="todolist-table">
    <thead>
      <tr className="todolist-table__titles">
        <th className="todolist-table__title">
          Id
        </th>
        <th className="todolist-table__title">
          User name
        </th>
        <th className="todolist-table__title">
          E-mail
        </th>
        <th className="todolist-table__title">
          Phone
        </th>
        <th className="todolist-table__title">
          Tasks
        </th>
        <th className="todolist-table__title">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </tbody>
  </table>
);

 export default TodoList;
