import { FC } from 'react';
import { Todos } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todos) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
