import { TodoInfo, Todo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
  </section>
);
