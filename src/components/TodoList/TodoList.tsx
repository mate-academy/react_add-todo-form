import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/Todo';

type Props = {
  todos: TodoWithUser[];
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
