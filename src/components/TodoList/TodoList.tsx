import { FC } from 'react';
import { TodoWithUser } from '../../types/Types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo todo={item} key={item.id} />
      ))}
    </section>
  );
};
