import React from 'react';

interface User {
  id: number,
  name: string
  username: string
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user : User | null
}

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => {
        const { title, completed, user } = todo;

        return user && (
          <div className="todo">
            <h2>{title}</h2>
            <p>{`Completed : ${completed}`}</p>
            <p>{`Name: ${user.name}`}</p>
          </div>
        );
      })}

    </>
  );
};
