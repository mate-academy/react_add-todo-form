import { FC } from 'react';

import { TodoListProps } from '../../types/TodoListTypes';
import { TodoInfo } from '../TodoInfo';

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (<TodoInfo todo={todo} key={todo.id} />))}
    </section>
  );
};
