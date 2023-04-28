import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          data-id={todo.id}
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
        />
      ))}
    </>
  );
};
