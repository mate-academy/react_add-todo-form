import React from 'react';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
