import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoListType } from '../../Types/Types';

export const TodoList: FC<{ todos: TodoListType[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <article
        data-id={todo.id}
        key={todo.id}
        className={`TodoInfo${!todo.completed ? '' : ' TodoInfo--completed'}`}
      >
        <TodoInfo todo={todo} />
      </article>
    ))}
  </section>
);
