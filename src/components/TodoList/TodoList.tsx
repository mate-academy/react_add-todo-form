import { FC } from 'react';
import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};
