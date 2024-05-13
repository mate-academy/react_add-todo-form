import { FC } from 'react';
import { TodoInfo } from '../../components/TodoInfo';
import { Props } from '../../types';

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
