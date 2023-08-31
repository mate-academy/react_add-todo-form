import { TodoUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: TodoUser[]
};

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
