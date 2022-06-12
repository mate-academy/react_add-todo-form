import { UserInfo } from '../UserInfo';
import './TodoList.css';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => (
  <ul className="TodoList">
    {props.todos.map(item => (
      <li className="TodoList__item" key={item.id}>
        {item.title}
        {item.user && (
          <UserInfo user={item.user} />
        )}
      </li>
    ))}
  </ul>
);
