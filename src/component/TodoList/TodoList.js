import React from 'react';

import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <>
    {
      todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <p>{todo.title}</p>
          <p>Completed: {todo.completed ? 'true' : 'false'}</p>
          <p>UserId: {todo.userId}</p>
        </div>
      ))
    }
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.string,
      userId: PropTypes.string,
    }).isRequired,
  ).isRequired,
}

export default TodoList;
