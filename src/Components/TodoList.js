import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TodoList = ({ todosWithUser }) => (
  <ul className="todo">
    {todosWithUser.map(todoWithUser => (
      <li
        key={todoWithUser.id}
      >
        <div className="todo__user">
          <div className="todo__user-task">
            Task:
            {' '}
            {(todoWithUser.title).replace(/[^\w\-_\s]/g, '')}
          </div>

          <div className="todo__user-name">
            UserId:
            {' '}
            {todoWithUser.userId}
          </div>

          <div className={
            todoWithUser.completed
              ? 'todo__user-completed'
              : 'todo__user-uncompleted'
          }
          >
            {todoWithUser.completed
              ? 'done'
              : 'in process'
            }
          </div>
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = { todosWithUser: PropTypes.arrayOf(
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
