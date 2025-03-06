import { FC } from 'react';
import { TodoInfo as TodoInfoType } from '../../types';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Array<TodoInfoType>;
};

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos?.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
    </section>
  );
};
