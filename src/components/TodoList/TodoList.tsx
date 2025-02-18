import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <section className="TodoList">
        {todos.map(todoItem => (
          <TodoInfo todo={todoItem} key={todoItem.id} />
        ))}
      </section>
    </>
  );
};
