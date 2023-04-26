import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { PreparedTodo } from '../../types/PreparedTodo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
