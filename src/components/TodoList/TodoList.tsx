import { FC } from 'react';
import { Todos } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todos[];
}

export const TodoList: FC<Props> = ({ todos }) => (

  <section className="TodoList">
    {todos.map((todo: Todos) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
