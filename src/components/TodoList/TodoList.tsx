import { TodoListProps } from '../../types/TodoListProps';
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = (props: TodoListProps) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
