import { FC } from 'react';
import { Todo } from '../../entities/todo/Todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
