import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListInt {
  todos: Todo[]
}

export const TodoList = (props: TodoListInt) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
