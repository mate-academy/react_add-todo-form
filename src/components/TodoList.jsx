import React from 'react';
import PropTypes from 'prop-types';


const TodoList = ({ todos }) => (
  <ul className="block list-group">
    {todos.map(todo => (
      <li className="list-group-item" key={todo.id}>
        <div><strong>Task:</strong>{` ${todo.title}`}</div>

        <div><strong>User:</strong>{` ${todo.user.name}`}</div>
        {(todo.completed) ? (
          <div><strong>Status:</strong> Done</div>
        ) : (
          <div><strong>Status:</strong> To do</div>
        )}

      </li>
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;