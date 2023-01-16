import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList__item">
    {todos.map(todo => (
      <li key={todo.id}>
        <TodoInfo
          todo={todo}
        />
      </li>
    ))}
  </ul>
);
