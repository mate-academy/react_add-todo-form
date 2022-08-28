import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todoItem => (
      <TodoInfo
        todo={todoItem}
        key={`${todoItem.userId}_${Math.random()}`}
      />
    ))}
  </section>
);
