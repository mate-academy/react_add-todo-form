import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

export type User = (typeof usersFromServer)[0];

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
}

export interface UserTodos {
  userId: number;
  userName: string;
  userEmail: string;
  userLogin: string;
  todoPosts: Todo[];
}

const usersTodos = usersFromServer
  .map(user => {
    const userTodo = todosFromServer.reduce((todosAcc: Todo[], todo) => {
      if (user.id === todo.userId) {
        todosAcc.push({ ...todo, ...{ createdAt: new Date() } });

        return todosAcc;
      }

      return todosAcc;
    }, []);

    return {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userLogin: user.username,
      todoPosts: userTodo,
    };
  })
  .filter(userTodo => userTodo.todoPosts.length > 0);

function findTheBiggestPostId(postList: UserTodos[]): number {
  return Math.max(
    ...postList.map(userPost =>
      Math.max(...userPost.todoPosts.map(post => post.id)),
    ),
  );
}

export const App = () => {
  // #region baseStates
  const [currentUsersTodos, setCurrentUsersTodos] =
    useState<UserTodos[]>(usersTodos);
  const [postCount, setPostCount] = useState(
    findTheBiggestPostId(currentUsersTodos) + 1,
  );
  // #endregion
  // #region title
  const [title, setTitle] = useState('');
  // #endregion
  // #region userSelecting
  const [isUserSelected] = useState(false);
  const [userSelectingValue, setUserSelectingValue] = useState<number>(0);
  // #endregion

  // #region fieldErrors
  const [hasTitleAnError, setHasTitleAnError] = useState<boolean>(false);
  const [hasSelectedUserAnError, setHasSelectedUserAnError] =
    useState<boolean>(false);

  const titleFieldHasAnError = title.length === 0;
  const selectedUserFieldHasAnError = userSelectingValue === 0;
  const formHasSomeError = hasTitleAnError || hasSelectedUserAnError;
  // #endregion

  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleAnError(false);
  };

  const handleSelectedUser = (userId: number): User => {
    return usersFromServer.find(user => user.id === userId) as User;
  };

  const onSubmit = (selectedUser: User): void => {
    const existingUser = currentUsersTodos.find(
      user => user.userId === selectedUser.id,
    );

    const newTodo = {
      id: postCount,
      title: title,
      completed: false,
      userId: selectedUser.id,
      createdAt: new Date(),
    };

    if (existingUser) {
      existingUser.todoPosts.push(newTodo);

      return setCurrentUsersTodos([...currentUsersTodos]);
    }

    return setCurrentUsersTodos([
      ...currentUsersTodos,
      {
        userId: selectedUser.id,
        userName: selectedUser.name,
        userEmail: selectedUser.email,
        userLogin: selectedUser.username,
        todoPosts: [
          {
            id: postCount,
            title: title,
            completed: false,
            userId: selectedUser.id,
            createdAt: new Date(),
          },
        ],
      },
    ]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formHasSomeError) {
      return;
    }

    setTitle('');
    setUserSelectingValue(0);
    setHasTitleAnError(false);
    setHasSelectedUserAnError(false);
    setPostCount(prev => prev + 1);
    onSubmit(handleSelectedUser(userSelectingValue));
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title:  '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title.trim()}
              onChange={handleTitleChange}
            />
            {hasTitleAnError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User:  '}
            <select
              data-cy="userSelect"
              value={userSelectingValue}
              onChange={event => setUserSelectingValue(+event.target.value)}
            >
              <option value="0" disabled={!isUserSelected}>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                  onClick={event =>
                    setUserSelectingValue(+event.currentTarget.value)
                  }
                >
                  {user.name}
                </option>
              ))}
            </select>

            {hasSelectedUserAnError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            setHasTitleAnError(titleFieldHasAnError);
            setHasSelectedUserAnError(selectedUserFieldHasAnError);
          }}
        >
          Add
        </button>
      </form>

      <TodoList userList={currentUsersTodos} />
    </div>
  );
};
