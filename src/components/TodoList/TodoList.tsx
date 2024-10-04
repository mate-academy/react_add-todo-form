import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../Types/TodosWithUsers';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
