import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
interface Props {
  todos: Todo[];
}
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo, index) => (
        <TodoInfo todo={todo} key={`${todo.id}_${index}`} />
      ))}
    </section>
  );
};
