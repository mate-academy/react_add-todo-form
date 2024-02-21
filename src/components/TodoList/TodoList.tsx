import React from 'react';

import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: {
    id: number,
    name: string,
    username: string,
    email: string,
  },
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(
        todo => (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        ),
      )}
    </>
  );
};
