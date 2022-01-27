import './TodoList.scss';

type Props = {
  preparedTodos: Todo[],
};

const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  // eslint-disable-next-line
  console.log(preparedTodos)

  return (
    <ul className="todo__list">
      {preparedTodos.map(todo => (
        <li key={todo.id} className="todo__item">
          <div>
            <span>User: </span>
            {todo.user?.name}
          </div>

          <div>
            <span>Task: </span>
            {todo.title}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
