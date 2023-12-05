import { FC } from 'react';
import { ToDoWithusers } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: ToDoWithusers[];
}

export const TodoList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
