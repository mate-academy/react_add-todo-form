import { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');

  const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setTitleError(false);
    setTitle(newTitle);
  };

  const addUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUser = e.target.value;

    setUserError(false);
    setUser(newUser);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextId = todoList.sort((a, b) => b.id - a.id)[0].id + 1;
    const nextUser = usersFromServer.find(u => u.name === user);

    if (!title && !user) {
      setTitleError(true);
      setUserError(true);

      return;
    }

    if (!title) {
      setTitleError(true);

      return;
    }

    if (!user) {
      setUserError(true);

      return;
    }

    if (nextUser) {
      setTodoList(prevState => [
        {
          id: nextId,
          userId: nextUser.id,
          title: title.replace(/[^a-zA-Z0-9А-Яа-яЁё ]/g, ''),
          completed: false,
          user: nextUser,
        },
        ...prevState,
      ]);
    }

    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <input
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Title"
            onChange={addTitle}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="name"
            onChange={addUser}
            value={user}
          >
            <option
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map(u => {
              return (
                <option key={u.id}>
                  {u.name}
                </option>
              );
            })}
          </select>
          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
