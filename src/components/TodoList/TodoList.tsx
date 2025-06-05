import { ListTodo } from '../../types/todoList';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<ListTodo> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todoItem => (
        <TodoInfo todo={todoItem} key={todoItem.id} />
      ))}
    </section>
  );
};
