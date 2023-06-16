import { FC } from 'react';
import { Todo } from '../../Types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
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
