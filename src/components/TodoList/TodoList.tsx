import { FC } from 'react';
import { TodoPlusUser } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoPlusUser[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
