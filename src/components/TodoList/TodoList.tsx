import { TodoListType } from '../../api/type/type';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todoList: TodoListType[];
}

export const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  if (!todoList || todoList.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <section className="TodoList">
      {todoList.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
