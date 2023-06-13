import { FC } from 'react';
import { TodoFullInfo } from '../../types/todoFullInfo';
import { TodoInfo } from '../TodoInfo';

type PropsTodos = {
  todos: TodoFullInfo[]
};

export const TodoList: FC<PropsTodos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
