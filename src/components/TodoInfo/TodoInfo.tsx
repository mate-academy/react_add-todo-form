import React from 'react';
import { TodoList } from '../TodoList';
import { TodosWithUser } from '../../types/TodosWithUser';

type Props = {
  todos: TodosWithUser[];
};

export const TodoInfo: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoList todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
