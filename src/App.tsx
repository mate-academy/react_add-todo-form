import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { useState } from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const users = usersFromServer;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosList);
  const [user, setUser] = useState<User | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newTodo) {
      setTitleError('Please enter a title');
    }

    if (!user) {
      setUserError('Please choose a user');
    }

    if (newTodo.trim() === '' || !user) {
      return;
    }

    const maxTodoId = Math.max(...todos.map(todo => todo.id));
    const newId = maxTodoId + 1;

    const todo: Todo = {
      id: newId,
      title: newTodo,
      completed: false,
      userId: user.id,
      user: user,
    };

    setTodos([...todos, todo]);
    setUser(null);
    setNewTodo('');
    setTitleError('');
    setUserError('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newTodo}
            onChange={e => {
              setTitleError('');
              setNewTodo(e.target.value);
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            defaultValue={0}
            onChange={e => {
              const userId = Number(e.target.value);
              const userById = users.find(userI => userI.id === userId) || null;

              // <span className="error">Please choose a user</span>;
              setUserError('');
              setUser(userById);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(userr => (
              <option value={userr.id} key={userr.id}>
                {userr.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
      {/* <section className="TodoList">

        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
