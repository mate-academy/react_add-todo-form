import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { User, Todo } from '../../types';

type Props = {
  users: User[];
  todos: Todo[];
};

export const TodoList:React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
        />
      ))}
    </section>
  );
};
