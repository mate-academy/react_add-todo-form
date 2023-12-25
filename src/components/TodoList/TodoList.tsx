import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { UserTodo } from '../../types/UserTodo';

interface Props {
  todos: UserTodo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
