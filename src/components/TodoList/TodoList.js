import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const { todos, users } = props;

  return (
    <table className="todos">
      <thead>
        <tr>
          <th>№ task</th>
          <th>Task</th>
          <th>Responsible person</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            user={users.find(user => user.id === todo.userId)}
          />
        ))}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
