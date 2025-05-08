import { Todo, User, TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
