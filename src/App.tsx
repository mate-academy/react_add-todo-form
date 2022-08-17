import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todosList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = usersFromServer
      .find(curUser => curUser.name === users) || null;

    const newTodo = {
      userId: user ? user.id : 0,
      id: todos.length + 1,
      title,
      completed: false,
      user: user || null,
    };

    setTitleError(!title);
    setUserError(!users);

    if (!title || !users) {
      return;
    }

    setTodoList(prev => [...prev, newTodo]);

    setTitle('');
    setUsers('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          onSubmit(event);
        }}
      >
        <div className="field">
          Title:
          {' '}

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          User:
          {' '}

          <select
            data-cy="userSelect"
            value={users}
            onChange={(event) => {
              setUsers(event.target.value);
              setUserError(false);
            }}
          >
            <option
              value=""
            >
              Choose a user
            </option>

            {usersFromServer.map(person => (
              <option
                value={person.name}
                key={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>

          {userError
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todosList} />
      </section>
    </div>
  );
};
