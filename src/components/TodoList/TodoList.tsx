import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = Todo[];

export const TodoList: React.FC<{ todos: Props }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => <TodoInfo todo={todo} key={todo.id} />)}

    </section>
  );
};
