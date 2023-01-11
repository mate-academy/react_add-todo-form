import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[]
};
export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
