import { FC } from 'react';
import { TodoWithUser } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
