type Todos = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};
type Props = {
  todos: Todos[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(item => (
      <li
        key={item.id}
        className="todo-list-item"
      >
        {item.title}
      </li>
    ))}
  </ul>

);
