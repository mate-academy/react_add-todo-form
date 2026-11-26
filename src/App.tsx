import './App.scss';

// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

type AddTodoHandler = (event: React.FormEvent<HTMLFormElement>) => void;

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const isValidate = (titleName: string, user: string) => {
    const isTitleCorrect = titleName.trim() !== '' ? true : false;
    const isUserCorrect = user.trim() !== '' ? true : false;

    const isValidValues: boolean = isTitleCorrect && isUserCorrect;

    if (!isTitleCorrect) {
      setTitleError(true);
    }

    if (!isUserCorrect) {
      setUserError(true);
    }

    return isValidValues;
  };

  const addTodoItem: AddTodoHandler = event => {
    event.preventDefault();

    const isValidValues = isValidate(title, selectedUserId);

    if (!isValidValues) {
      return;
    }

    const currentUser: User | undefined = usersFromServer.find(
      user => user.id === Number(selectedUserId),
    );

    if (!currentUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: currentUser.id,
      user: currentUser,
    };

    setTodoList(currentTodos => {
      return [...currentTodos, newTodo];
    });

    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodoItem}>
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              placeholder="Enter a title"
              id="titleInput"
              value={title}
              onChange={event => {
                setTitle(
                  event.target.value.replace(
                    /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
                    '',
                  ),
                );
                setTitleError(false);
              }}
              onBlur={() => setTitleError(!title.trim())}
              type="text"
              data-cy="titleInput"
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setUserError(false);
            }}
            onBlur={() => setUserError(!selectedUserId)}
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
