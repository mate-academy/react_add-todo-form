import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list-group">
    {todos.map((todo) => (
      <>
        <li key={todo.id} className="list-group-item list-group-item-action">
          <TodoInfo todo={todo} />
        </li>
      </>
    ))}
  </ul>
);
