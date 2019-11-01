import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ todos }) {
  return (
    <table className="table">
      <thead className="thead">
        <tr>
          <th className="cell">
            Todo Item
          </th>
          <th className="cell">
            Assigned to
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
