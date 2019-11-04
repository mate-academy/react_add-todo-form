import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoitem/TodoItem';

function TodoList({ todos }) {
  return (
    <table className="ui celled table">
      <thead className="thead">
        <tr>
          <th>Id</th>
          <th>TODO</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
}

TodoList.PropTypes = {
  todos: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default TodoList;
