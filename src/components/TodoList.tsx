type TODO = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

type Props = {
  todos: TODO[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.id}
          {' - '}
          {todo.title}
          {`. User id: ${todo.userId}`}
          {`. Status: ${todo.completed}`}
        </li>
      ))}
    </ul>
  );
};
