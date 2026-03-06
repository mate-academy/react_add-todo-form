import { TodoInfo } from '../TodoInfo';
import { TodoListType } from '../../api/type';

interface TodoListProps {
  todos: TodoListType[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
