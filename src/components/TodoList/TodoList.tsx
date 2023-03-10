import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        const curentUser = users.find(user => user.id === todo.userId);

        return (curentUser
          ? (
            <TodoInfo
              key={todo.id}
              todo={todo}
              user={curentUser}
            />
          )
          : (curentUser)
        );
      })}
    </section>
  );
};
