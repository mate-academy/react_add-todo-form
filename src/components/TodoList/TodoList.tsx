import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList: FC<Props> = ({ preparedTodos }) => (
  <section className="TodoList">
    {preparedTodos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
