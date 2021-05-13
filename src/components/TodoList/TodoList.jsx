import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  users, todos, onChange,
}) => (
  <div className="TodoList">
    <h2 className="TodoList__header">
      Todo List
    </h2>

    <ul className="TodoList__list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          user={users.find(user => user.id === todo.userId)}
          title={todo.title}
          checked={todo.completed}
          onChange={onChange}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ),
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  users: [],
  todos: [],
};
