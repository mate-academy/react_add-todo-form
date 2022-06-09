import div from 'react';
import { PreparedToDo } from '../react-app-env';

type Props = {
  todos: PreparedToDo[],
};

export const TodoList: div.FC<Props> = ({ todos }) => (
  <div className="mt-4">
    {todos.map(todo => (
      <div key={todo.id} className="message is-link mb-4">
        <h3 className="message-header">
          {`Task #${todo.id}: ${todo.title}`}
        </h3>
        <div className="message-body mb-6">
          <p>
            <b>{todo.completed ? 'Completed' : 'Not completed'}</b>
          </p>
          {todo.user && (
            <>
              <p>{todo.user.name}</p>
              <p>{todo.user.email}</p>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
);
