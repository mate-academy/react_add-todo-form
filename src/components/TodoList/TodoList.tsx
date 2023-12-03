import { TodoInfo } from '../TodoInfo';
import { Todo, TodosInfoType } from '../types/UserAndTodo';

export const TodoList: React.FC<TodosInfoType> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
