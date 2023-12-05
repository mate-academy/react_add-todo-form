import { FC } from 'react';
import { TodoWithUser } from '../../Interfaces/Interfaces';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[]
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
