import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todoItem => (
        <TodoInfo key={todoItem.id} todo={todoItem} />
      ))}
    </section>
  );
};
