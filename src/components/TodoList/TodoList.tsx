import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../api/types/Todo'

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <section className="TodoList">
        {todos.map(todo => {
          return <TodoInfo key={todo.id} todo={todo}/>;
        })}
      </section>
    </>
  );
};
