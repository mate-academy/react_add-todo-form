import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
