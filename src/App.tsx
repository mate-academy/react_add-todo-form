import { FormEvent, useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo, User } from './react-app-env';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  const user = usersFromServer.find(currentUser => currentUser.id === userId);

  return user || null;
};

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setNewUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const generateTodoId = (currentTodos: Todo[]) => {
    const biggestId = [...currentTodos].sort((previous, current) => (
      current.id - previous.id
    ))[0].id;

    return biggestId + 1;
  };

  const clearState = () => {
    setNewTitle('');
    setNewUserId(0);
    setIsTitleValid(true);
    setIsUserValid(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTitle.trim();
    const inputUser = getUserById(newUserId);

    if (!trimmedTitle || !inputUser) {
      if (!trimmedTitle) {
        setIsTitleValid(false);
      }

      if (!inputUser) {
        setIsUserValid(false);
      }

      return;
    }

    const newTodo: Todo = {
      id: generateTodoId(todos),
      title: newTitle,
      completed: false,
      userId: newUserId,
      user: inputUser,
    };

    setTodos(previousTodos => ([
      ...previousTodos,
      newTodo,
    ]));

    clearState();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <span>Title: </span>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);

              if (!isTitleValid) {
                setIsTitleValid(true);
              }
            }}
          />

          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>

          <select
            data-cy="userSelect"
            value={newUserId}
            onChange={event => {
              setNewUserId(+event.target.value);

              if (!isUserValid) {
                setIsUserValid(true);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {!isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
