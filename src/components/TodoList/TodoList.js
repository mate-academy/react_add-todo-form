import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, users }) => {
  const prepTodos = todos.map(todo => ({
    ...todo,
    name: users.find(
      user => (user.id === todo.userId),
    ).name,
  }));

  return (
    <div className="todos">
      {prepTodos.map(todo => (
        <div className="todo" key={todo.id}>
          Task:
          <p>{todo.title}</p>
          Task performer:
          <p>{todo.name}</p>
        </div>
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
