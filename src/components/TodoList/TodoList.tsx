import { FC } from 'react';

import { TodoInfo } from '../TodoInfo';

import { ITodoList } from './Todo.types';

export const TodoList: FC<ITodoList> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
