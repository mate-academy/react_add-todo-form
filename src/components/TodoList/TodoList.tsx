import React from 'react';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';

type TodoListProps = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
};

export const TodoList: React.FC<TodoListProps> = todos => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            userId={todo.id}
            userEmail={user?.email || ''}
            userName={user?.name || 'Unknown user'}
          />
        );
      })}
    </section>
  );
};
