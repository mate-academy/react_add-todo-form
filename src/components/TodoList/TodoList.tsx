import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/types';

type TodoInfoProps = {
  todos: Todo[];
};

export const TodoList: FC<TodoInfoProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
