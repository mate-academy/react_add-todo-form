import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ todos }) => (
  <section className="TodoList">
    {Array.isArray(todos) &&
      todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
