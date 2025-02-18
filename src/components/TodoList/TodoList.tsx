import { NewTodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: NewTodo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
