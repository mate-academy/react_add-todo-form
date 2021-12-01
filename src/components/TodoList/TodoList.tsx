import users from '../../api/users';
import './TodoList.scss';

type Todo = {
  userId: number,
  id: number,
  title: string,
};

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="Todo_List">
      {todos.map(item => (
        <li
          key={item.id + 1}
          className="Todo_List--Item"
        >
          {`${item.title} : ${users.find(user => item.userId === user.id)?.name}`}
        </li>
      ))}
    </ul>
  );
};
