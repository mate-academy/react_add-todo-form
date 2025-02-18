import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../Types/User';

type Props = {
  todos: Todo[];
  todoUser: User | null;
};

export const TodoList: React.FC<Props> = ({ todos, todoUser }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} todoUser={todoUser} />
      ))}
    </section>
  );
};
