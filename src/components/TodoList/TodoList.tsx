import { Todo, TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[]
};

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
