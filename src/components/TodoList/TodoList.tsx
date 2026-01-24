import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(el => (
        <TodoInfo key={el.id} todo={el} user={el.user} />
      ))}
    </section>
  );
};
