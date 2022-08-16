import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList = (props: Props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
