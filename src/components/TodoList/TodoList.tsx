import React from 'react';
import { TodoUser } from '../../interfaces/todoUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
