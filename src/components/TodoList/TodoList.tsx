import { FC } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { FullTodo } from '../../types';

type Props = {
  todos: FullTodo[];
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
