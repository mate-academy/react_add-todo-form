import { TodoInfo } from '../TodoInfo/TodoInfo';

type User = {
  id: string;
}
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  user?: User;
};

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo}/>
    ))}
  </section>
);
