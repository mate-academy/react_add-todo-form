import { Todo } from '../Types/Todo';
import { TodoInfo } from '../TodoInfo';

export type TodoListProps = {
  todos: Todo[]
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
