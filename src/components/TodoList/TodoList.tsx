import { FC } from 'react';
import { ToDoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDoWithUser[];
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
