import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ allTodos }) => (

  <table className="todoList">

    <thead>
      <tr className="todoList__title">
        <th>№</th>
        <th>Title</th>
        <th>User</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {allTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>

  </table>
);

TodoList.propTypes = {
  allTodos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    map: PropTypes.func.isRequired,
  })).isRequired,
};

export default TodoList;
