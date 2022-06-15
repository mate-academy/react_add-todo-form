import React from 'react';
import { Todo } from '../Types/Types';
import { TodoData } from '../TodoData/TodoData';
import { UserData } from '../User/UserData';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => (
  <ol>
    {todos.map(item => (
      <li key={item.id}>
        <TodoData todo={item} />
        {item.user && <UserData user={item.user} />}
      </li>
    ))}
  </ol>
));
