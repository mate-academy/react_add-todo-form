import { FC } from 'react';
import { TodoItem } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList: FC<{ items: TodoItem[] }> = ({ items }) => {
  return (
    <section className="TodoList">
      {items.map((item) => {
        return <TodoInfo key={item.id} item={item} />;
      })}
    </section>
  );
};
