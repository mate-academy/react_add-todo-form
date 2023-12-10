import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <section className="TodoList" key={todo.id}>
          <TodoInfo
            id={todo.id}
            userId={todo.userId}
            title={todo.title}
            completed={todo.completed}
          />
        </section>
      ))}
    </>
  );
};
