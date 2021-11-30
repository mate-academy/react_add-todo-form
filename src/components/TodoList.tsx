import React from 'react';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => {
        const {
          id,
          title,
          completed,
          user,
        } = todo;

        return (
          <li key={id}>
            <h2>{user?.name}</h2>
            <h3>{title}</h3>
            <p>{completed ? 'Completed' : 'In process'}</p>
          </li>
        );
      })}
    </>
  );
};
