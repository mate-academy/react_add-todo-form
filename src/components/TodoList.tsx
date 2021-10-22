import { Todo } from '../types/Todo';

export const TodoList: React.FC<{ preparedTodos: Todo[] }> = ({ preparedTodos }) => (
  <ul>
    {preparedTodos.map(todo => (
      <li key={todo.id}>
        <p>
          UserId:
          {todo.userId}
        </p>
        <h3>
          Title:
          {todo.title}
        </h3>
        {/* <h4>
          Is completed:
          {todo.completed ? 'true' : 'false'}
        </h4> */}
        {todo.user && (
          <>
            <h2>
              {`Name: ${todo.user.name}`}
            </h2>
            <h3>
              email:
              {todo.user.email}
            </h3>
          </>
        )}
      </li>
    ))}
  </ul>
);
