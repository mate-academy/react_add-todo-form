import { FC } from 'react';
import { ITodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TTodoList = {
  todos: ITodo[]
};

export const TodoList: FC<TTodoList> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
