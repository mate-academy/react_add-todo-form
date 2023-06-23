import { FC } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
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
