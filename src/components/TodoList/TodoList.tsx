import { FC } from 'react';
import { TodoWithUser } from '../../types/interfaces';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
