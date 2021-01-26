import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TodoList = ({ todos }) => (
  <ul className="todo">
    {todos.map(todo => (
      <li
        key={todo.id}
      >
        <div className="todo__user">
          <div className="todo__user-task">
            Task:
            {' '}
            {(todo.title).replace(/[^\w\-_\s]/g, '')}
          </div>

          <div className="todo__user-name">
            UserId:
            {' '}
            {todo.userId}
          </div>

          <div className={
            todo.completed
              ? 'todo__user-completed'
              : 'todo__user-uncompleted'
          }
          >
            {todo.completed
              ? 'done'
              : 'in process'
            }
          </div>
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = { todos: PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
) }.isRequired;

export default TodoList;
