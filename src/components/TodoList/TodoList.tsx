import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

interface TodoListProps {
  todos: Todo[];
}

const renderUserInfo = (todo: Todo) => {
  if (!todo.user) {
    return <span className="UserInfo">User not available</span>;
  }

  if (!todo.user.name) {
    return <span className="UserInfo">User name not available</span>;
  }

  if (!todo.user.email) {
    return;
    <span className="UserInfo"> {todo.user.name} (email not available)</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${todo.user.email}`}>
      {todo.user.name}
    </a>
  );
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <article
        key={todo.id}
        data-id={todo.id}
        className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title ?? 'No title'}</h2>
        {renderUserInfo(todo)}
      </article>
    ))}
  </section>
);
