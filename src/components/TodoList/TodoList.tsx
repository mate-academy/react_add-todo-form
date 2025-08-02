import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo todo={item} key={item.id} />
      ))}
    </section>
  );
};
