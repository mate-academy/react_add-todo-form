import React from 'react';
import { Todo } from '../../type/todo';
import { User } from '../../type/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Array<Todo>;
  users: Array<User>;
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  const maxTodoId = Math.max(...todos.map((todo) => todo.id));

  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          maxId={maxTodoId}
          todo={todo}
          users={users}
        />
      ))}
    </section>
  );
};
