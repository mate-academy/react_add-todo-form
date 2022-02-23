import users from '../api/users';
import './Todo.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className="todo__list">
        {todo.title}
        {' - '}
        {users.find(user => user.id === todo.userId)?.name}
        {users.find(user => user.id === todo.userId)?.email}
      </li>
    ))}
  </ul>
);
