import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';
import './todoList.css';

const TodoList = ({ todos, onChangeTodoStatus }) => (
  <table className="todos-table">
    <thead>
      <tr className="todos-table__head">
        <th>Id</th>
        <th>Status</th>
        <th>Todo</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {
        todos.map(todo => (
          <TodoItem
            {...todo}
            onChangeTodoStatus={onChangeTodoStatus}
            key={todo.id}
          />
        ))
      }
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  onChangeTodoStatus: PropTypes.func.isRequired,
};

export default TodoList;
