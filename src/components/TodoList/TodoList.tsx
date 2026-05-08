import { TodoWithUserItem } from '../../types/TodoItemType';
import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUserItem[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
