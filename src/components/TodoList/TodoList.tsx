import { Todo } from '../Types/Todo';
import { TodoInfo } from '../TodoInfo';

export type TodoListPropsType = {
  todos: Todo[]
};

export const TodoList = ({ todos }: TodoListPropsType) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
