import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="table table-bordered table-hover container">
    <thead className="thead-dark">
      <tr>
        <th>Progress</th>
        <th>Title</th>
        <th>User Id is:</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
