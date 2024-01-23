import React from 'react';
import { TodoAndUser } from '../../types/TodoAndUsers';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoAndUser[];
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo key={todo.id} todo={todo} />
        );
      })}
    </section>
  );
};
