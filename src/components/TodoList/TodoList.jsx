import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

const TodoList = ({ users, todos }) => (
  <div className="todosList">
    {todos.map((todo) => {
      const maxTodo = 8;

      if (todos.length > maxTodo) {
        // eslint-disable-next-line no-alert
        alert('To much todos');
      }

      const findUser = users.find(user => user.id === todo.id);

      return (
        <div className="todo">
          <h2>{findUser.name}</h2>
          <span>{todo.title}</span>
          <p>{todo.completed ? 'copmleted' : 'in the process...' }</p>
        </div>
      );
    })}
  </div>
);

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default TodoList;
