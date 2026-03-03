import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoVar {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface TodoListProps {
  todo: TodoVar;
  index: number;
  setUsers: React.Dispatch<React.SetStateAction<TodoVar[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todo,
  index,
  setUsers,
}) => {
  const setTrue = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setUsers(prev => {
      return prev.map((u: TodoVar, i: number) =>
        i === index ? { ...u, completed: true } : u,
      );
    });
  };

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo TodoInfo${todo.completed ? '--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={todo.user.email} onClick={e => setTrue(e)}>
        {todo.user.name}
      </a>
    </article>
  );
};
