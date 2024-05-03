import { TodoListProps } from '../../types';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  console.log(todos.map(todo => todo.id));
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
