import React from 'react';
import { TodoInfo } from '..';
import Todo from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return todos.length ? (
    <div>
      <h2 className="title">Todos:</h2>
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          userFullName={todo.user.name}
          userNickName={todo.user.username}
          todoTitle={todo.title}
          todoStatus={todo.completed}
        />
      ))}
    </div>
  ) : (
    <p>No todos yet</p>
  );
};
