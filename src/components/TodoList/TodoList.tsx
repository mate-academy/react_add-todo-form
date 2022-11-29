import React from 'react';
import { TodosAndUsers } from '../../types/todosAndUsers';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodosAndUsers[],
};
export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {
      todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))
    }
  </section>
);
