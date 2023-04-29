import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types/PreparedTodo';
import { User } from './types/User';

const findUser = (users: User[], userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const getNewTodoId = (todoList: PreparedTodo[]) => {
  const usedIds = todoList.map(todo => todo.id).sort((a, b) => a - b);
  const largestId = usedIds[usedIds.length - 1];
  const newId = largestId + 1;

  return newId;
};

const initialTodoList: PreparedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(usersFromServer, todo.userId),
}));

export const App = () => {
  const [titleInput, setTitleInput] = useState('');
  const [userIdSelect, setUserIdSelect] = useState(0);
  const [preparedTodoList, setPreparedTodoList] = useState(initialTodoList);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleEnter = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);

    if (isTitleError) {
      setIsTitleError(false);
    }
  };

  const handleUserSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    setUserIdSelect(value);

    if (isUserError === true) {
      setIsUserError(false);
    }
  };

  const validateForm = () => {
    const isNoTitle = titleInput.trim() === '';
    const isNoUser = userIdSelect === 0;

    if (isNoTitle || isNoUser) {
      if (isNoTitle) {
        setIsTitleError(true);
      }

      if (isNoUser) {
        setIsUserError(true);
      }

      return false;
    }

    return true;
  };

  const clearForm = () => {
    setTitleInput('');
    setUserIdSelect(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const id = getNewTodoId(preparedTodoList);
    const user = findUser(usersFromServer, userIdSelect);

    setPreparedTodoList(currentList => (
      [
        ...currentList,
        {
          id,
          title: titleInput,
          completed: false,
          user,
        },
      ]
    ));

    clearForm();
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
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleInput}
              onChange={handleTitleEnter}
            />
          </label>

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userIdSelect}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(person => (
                <option
                  value={person.id}
                  key={person.id}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodoList} />
    </div>
  );
};
