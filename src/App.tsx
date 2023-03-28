import original from 'react95/dist/themes/original';
import { useState } from 'react';
import './App.scss';

import {
  styleReset,
  Button,
  Window,
  WindowHeader,
  WindowContent,
} from 'react95';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

/* Pick a theme of your choice */

import { TodoList } from './components/TodoList';

// api
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

// types
import { Todo } from './types/Todo';
import { User } from './types/User';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

function getUserById(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId)
  || null;
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);
  const [newUserId, setNewUserId] = useState(0);
  const [newTodoName, setNewTodoName] = useState('');
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTodoNameError, setHasTodoNameError] = useState(false);

  const handleReset = () => {
    setNewUserId(0);
    setNewTodoName('');
  };

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: newTodos.length + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setNewTodos((previousGoods) => [...previousGoods, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoName && newUserId) {
      addNewTodo(newTodoName, newUserId);
      handleReset();
    }

    setHasUserError(!newUserId);
    setHasTodoNameError(!newTodoName);
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Window resizable className="window">
          <WindowHeader className="window-title">
            <span>Add todo form</span>
          </WindowHeader>
          <WindowContent>
            <div className="App">
              <form onSubmit={handleFormSubmit}>
                <div className="field">
                  <input
                    type="text"
                    data-cy="titleInput"
                    placeholder="Enter a title"
                    value={newTodoName}
                    onChange={(event) => {
                      setNewTodoName(event.target.value);
                    }}
                  />

                  {hasTodoNameError
                    && <span className="error">Please enter a title</span>}
                </div>

                <div className="field">
                  <select
                    data-cy="userSelect"
                    value={newUserId}
                    onChange={(event) => setNewUserId(+event.target.value)}
                  >
                    <option key={0} value={0} disabled>
                      Choose a user
                    </option>
                    {usersFromServer.map((currentUser) => (
                      <option key={currentUser.id} value={currentUser.id}>
                        {currentUser.name}
                      </option>
                    ))}
                  </select>

                  {hasUserError
                    && <span className="error">Please choose a user</span>}
                </div>

                <Button
                  fullWidth
                  type="submit"
                  data-cy="submitButton"
                >
                  Add
                </Button>
              </form>

              <TodoList todos={newTodos} />
            </div>
          </WindowContent>
        </Window>
      </ThemeProvider>
    </>
  );
};
