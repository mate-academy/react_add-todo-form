import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos }) {
  return (
    <table className="todo-list">
      <thead className="todo-list-head">
        <tr>
          <td>Title</td>
          <td>Username</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody className="todo-list-body">
        {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </tbody>
    </table>
  );
}

TodoList.defaultProps = {
  todos: [],
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

export default TodoList;
