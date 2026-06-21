import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}

interface Props {
  todos: Todo[];
  renderTodo?: (todo: Todo) => React.ReactNode;
}

export const TodoList: React.FC<Props> = ({ todos, renderTodo }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (renderTodo ? renderTodo(todo) : null))}
    </section>
  );
};
