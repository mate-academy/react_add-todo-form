import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return <TodoInfo key={todo.id} todo={todo} user={user} />;
    })}
  </section>
);
