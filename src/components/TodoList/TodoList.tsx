import { FC } from 'react';
import { TodoWithUser } from '../../Types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList:FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todoItem => (
        <TodoInfo key={todoItem.id} todoItem={todoItem} />
      ))}
    </section>
  );
};
