import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <li key={todo.id}>
        Todo №
        {todo.id}
        <Todo todo={todo} />
      </li>
    ))}
  </>
);

const Todo = ({ todo }) => (
  <>
    <ul>
      <li className="todoList">
        Title:
        {todo.title}
      </li>
      <li className="todoList">
        Completed:
        {todo.completed ? 'true' : 'false'}
      </li>
      <li className="todoList">
        User:
        <User user={todo.user} />
      </li>
    </ul>
  </>
);

const User = ({ user }) => (
  <>
    <span className="userName">{user ? user.name : '0'}</span>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
