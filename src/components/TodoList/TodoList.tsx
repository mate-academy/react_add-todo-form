import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={
            todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
          }
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a className="UserInfo" href={`mailto:${todo.user.email}`}>
            {todo.user.name}
          </a>
        </article>
      ))}
    </section>
  );
};
