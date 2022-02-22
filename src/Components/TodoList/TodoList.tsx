import React from 'react';

interface User {
  id: number,
  name: string,
  email: string,
}

interface Todos {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

type Props = {
  todoList: Todos[] | undefined,
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="todo__list">
      {todoList?.map(todo => (
        <li className="todo__item" key={todo.id}>
          <h2>{todo.title}</h2>
          <p>
            {todo.completed
              ? 'Status: completed'
              : 'Status: not completed'}
          </p>
          <p>{`Name: ${todo.user?.name}`}</p>
          <p>{`Email: ${todo.user?.email}`}</p>
        </li>
      ))}
    </ul>
  );
};
