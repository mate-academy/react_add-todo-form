import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="todo-list-table">
    <thead>
      <tr className="todo-list-table__titles">
        <th
          data-sort-type="id"
          data-column="0"
          className="todo-list-table__title"
        >
          ID
        </th>
        <th
          data-sort-type="name"
          data-column="1"
          className="todo-list-table__title"
        >
          User Name
        </th>
        <th
          data-sort-type="name"
          data-column="2"
          className="todo-list-table__title"
        >
          E-mail
        </th>
        <th
          data-sort-type="name"
          data-column="3"
          className="todo-list-table__title"
        >
          Phone
        </th>
        <th
          data-sort-type="todos"
          data-column="4"
          className="todo-list-table__title"
        >
          Tasks
        </th>
      </tr>
    </thead>
    <tbody className="todo-list-table__tasks">
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
