type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="list">
          <h2>{todo.title}</h2>
          <div>{todo.user && todo.user.name}</div>
          <div>{todo.user && todo.user.email}</div>
        </li>
      ))}
    </ul>
  </div>
);
