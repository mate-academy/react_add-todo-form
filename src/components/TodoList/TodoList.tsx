import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todos {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  todos: Todos[],
};

export const TodoList: React.FC< Props > = ({ todos }) => (
  <section className="TodoList">

    {todos.map(todo => (

      <TodoInfo key={todo.id} todo={todo} />
    ))}

  </section>
);
