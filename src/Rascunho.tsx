/* #Region App





import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);

  const handleInsertTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trim());
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setUser(+event.target.value);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTitle(event.target.title.trim());
  };



  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            value={title}
            onChange={handleInsertTitle}
            type="text"
            data-cy="titleInput"
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select value={user} onChange={handleSelect} data-cy="userSelect">
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
#endRegion */

/* Region TodoInfo
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => (
  <article className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);

*/

/* Region TodoList
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';
// Add the required props

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
*/

/* Region UserInfo
import { User } from '../../types/user';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => (
  <>
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  </>
);
*/

/* Region Todo type
import { User } from './user';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
};
*/

/* Region User type
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
*/
