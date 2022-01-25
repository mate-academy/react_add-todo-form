import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="box">
      {todos.map(todo => (
        <li key={todo.id} className="list-item box has-background-link-light">
          <div className="list-item_user-name is-italic is-size-6 has-text-link">
            {todo.userName}
          </div>
          <h2 className="title is-4 has-text-link">{todo.title}</h2>
        </li>
      ))}
    </ul>
  );
};
