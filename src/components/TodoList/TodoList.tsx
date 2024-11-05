import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
