import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      return <TodoInfo key={todo.id} todo={todo} />;
    })}
  </section>
);
