import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <div className="card" key={todo.id}>
        <p className="card__id">
          №:
          <span>{todo.id}</span>
        </p>
        <span>Title:</span>
        <h3 className="card__title">{todo.title}</h3>
        <span>User:</span>
        <p className="card__name">{todo.name}</p>
        <p>
          Status:
          {todo.completed
            ? <span className="card__status--ok"> Completed</span>
            : <span className="card__status--no"> In process</span>
          }
        </p>
      </div>
    ))}
  </>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
