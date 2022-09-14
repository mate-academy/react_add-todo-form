import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserWithTodo } from '../../types/UserWithTodo';

type Props = {
  todos: UserWithTodo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
