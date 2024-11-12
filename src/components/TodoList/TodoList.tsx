import { Todo, User } from '../../App';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: (Todo & { user: User })[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <>
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  </>
);
