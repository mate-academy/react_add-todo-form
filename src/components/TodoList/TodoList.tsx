import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { ITodoInfo } from '../../types/ITodoInfo';

type Props = {
  todos: ITodoInfo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
