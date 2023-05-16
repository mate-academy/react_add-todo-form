import { TodoInfo, Todo } from '../TodoInfo';

type TodoProps = {
  todos: Todo[],
};

export const TodoList = ({ todos }: TodoProps) => (
  <section className="TodoList">
    {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
  </section>
);
