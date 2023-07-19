/* eslint-disable import/no-cycle */
import { Todo } from '../../App';
import { TodoInfo } from '../TodoInfo';

export interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo todo={todo} key={todo.id} todos={[]} />
    ))}
  </section>
);
