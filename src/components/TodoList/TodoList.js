import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <div className="card" key={todo.id}>
        {todo.id}
        .
        <h3>{todo.title}</h3>
        <p>{todo.name}</p>
        <p>
          Status:
          {todo.completed
            ? <span>completed</span>
            : <span>not completed</span>
          }
        </p>
      </div>
    ))}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default TodoList;
