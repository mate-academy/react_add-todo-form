import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';

interface ListTodoProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: ListTodoProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => todo.user && <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
