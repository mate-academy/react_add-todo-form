import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';
import { User } from '../../types/User';

type Props = {
  todos: Todos[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      return <TodoInfo todo={todo} key={todo.id} />;
    })}
  </section>
);
