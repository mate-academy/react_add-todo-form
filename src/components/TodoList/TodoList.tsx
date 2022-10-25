import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Props } from '../../types';

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        const { id } = todo;

        return (
          <TodoInfo
            todo={todo}
            key={id}
          />
        );
      })}
    </section>
  );
};
