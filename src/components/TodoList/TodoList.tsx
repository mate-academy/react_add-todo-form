import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

type TodoListPros = {
  todos: TodoWithUser[];
};

export const TodoList = ({ todos }: TodoListPros) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
