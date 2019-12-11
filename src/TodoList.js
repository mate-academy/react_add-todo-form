import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="Table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>User name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </tbody>
  </table>

);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
