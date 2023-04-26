import { useState, FormEvent } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { PreparedTodo } from './types/PreparedTodo';

const getNewTodoId = (todoList: PreparedTodo[]) => {
  const usedIds = todoList.map(todo => todo.id).sort((a, b) => a - b);
  const freeId = usedIds.findIndex((usId, index) => usId !== index + 1);
  const newId = freeId !== -1 ? freeId + 1 : usedIds.length + 1;

  return newId;
};

export const App = () => {
  const initialTodoList: PreparedTodo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));

  const [titleInput, setTitleInput] = useState('');
  const [userIdSelect, setUserIdSelect] = useState(0);
  const [preparedTodoList, setPreparedTodoList] = useState(initialTodoList);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleEnter = (value: string) => {
    setTitleInput(value);
    if (titleError === true) {
      setTitleError(false);
    }
  };

  const handleUserSelect = (value: number) => {
    setUserIdSelect(value);
    if (userError === true) {
      setUserError(false);
    }
  };

  const validateForm = () => {
    const noTitle = titleInput === '';
    const noUser = userIdSelect === 0;

    if (noTitle || noUser) {
      if (noTitle) {
        setTitleError(true);
      }

      if (noUser) {
        setUserError(true);
      }

      return false;
    }

    return true;
  };

  const clearForm = () => {
    setTitleInput('');
    setUserIdSelect(0);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const id = getNewTodoId(preparedTodoList);
    const user = usersFromServer
      .find(person => person.id === userIdSelect) || null;

    setPreparedTodoList(currentList => {
      const newList = [...currentList];

      newList.push({
        id,
        title: titleInput,
        completed: false,
        user,
      });

      return newList;
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleInput}
              onChange={event => handleTitleEnter(event.target.value)}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userIdSelect}
              onChange={event => handleUserSelect(Number(event.target.value))}
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
          {userError && <span className="error">Please choose a user</span>}
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
