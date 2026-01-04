import { TodoItem } from '../../types/TodoItem';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: TodoItem[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todoItem => (
        <TodoInfo key={todoItem.id} todo={todoItem} />
      ))}
    </section>
  );
};
