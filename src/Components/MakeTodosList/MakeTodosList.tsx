import React from 'react';
import { MakeTodosCard } from '../MakeTodosCard';
import { Todos } from '../../Types/Todos';

type Props = {
  todoslist: Todos[];
};

export const MakeTodosList: React.FC<Props> = ({ todoslist }) => (
  <ul>
    {todoslist.map(todo => (
      <li key={todo.id}>
        <MakeTodosCard
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
