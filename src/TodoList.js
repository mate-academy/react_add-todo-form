import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <div className="card" key={todo.id}>
        <p>
          ID:
          <span>{todo.id}</span>
        </p>
        <span>Title:</span>
        <h3>{todo.title}</h3>
        <span>Users name:</span>
        <p>{todo.user.name}</p>
        <p>
          Status:
          {todo.completed
            ? <span>Completed</span>
            : <span>Need to do</span>
          }
        </p>
      </div>
    ))}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default TodoList;
