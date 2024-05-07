import { FC } from 'react';

import { TodoInfo } from '../TodoInfo';

import { findMaxTodoId } from '../../helpers';

import { ITodoList } from './Todo.types';

export const TodoList: FC<ITodoList> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo, _, arr) => (
        <TodoInfo
          todo={{ ...todo, id: findMaxTodoId(arr) + 1 }}
          key={todo.id}
        />
      ))}
    </section>
  );
};
