import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => {
        const todoUser = users.find(user => user.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={todoUser}
          />
        );
      })}
    </div>
  );
};
