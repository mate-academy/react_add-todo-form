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
          key={Math.random()}
          className="Todo_List--Item"
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};
