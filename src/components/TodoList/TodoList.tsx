import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(todo => {
      const matchedUser = users.find(u => u.id === todo.userId);

      return (
        <TodoInfo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          userId={todo.userId}
          userEmail={matchedUser?.email || ''}
          userName={matchedUser?.name || 'Unknown User'}
        />
      );
    })}
  </section>
);
