import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { Users } from '../../types/Users';

type Props = {
  todos: Todo[];
  userList: Users[];
};

export const TodoList: React.FC<Props> = ({ todos, userList }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const u = userList.find(user => user.id === todo.userId);

        if (!u) {
          return null;
        }

        return <TodoInfo key={todo.id} todo={todo} user={u} />;
      })}
    </section>
  );
};
