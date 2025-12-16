import { ToDo } from '../types';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: ToDo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((toDo: ToDo) => (
        <TodoInfo key={toDo.id} toDo={toDo} />
      ))}
    </section>
  );
};
