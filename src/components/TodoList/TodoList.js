import React from 'react';
import { TodoListShape } from '../Shapes/TodoListShape';

export const TodoList = (props) => {
  const { todos, users } = props;

  const getUserById = userId => users.find(user => user.id === userId);

  const todosWithUserId = todos.map(todo => ({
    ...todo,
    userId: getUserById(todo.userId),
  }));

  return (
    <ul className="todo__list">
      {todosWithUserId.map(todo => (
        <li
          key={todo.id}
        >
          {todo.name}
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = TodoListShape.isRequired;

TodoList.defaultProps = {
  todos: [],
  users: [],
};
