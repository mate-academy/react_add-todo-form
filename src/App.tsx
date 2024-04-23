import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/todo';
import { User } from './types/user';
import { ChangeEvent, useState } from 'react';

type TypeField = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const serverTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const DEFAULT_VALUES = {
  title: '',
  userId: 0,
  user: null,
  id: 0,
  completed: false,
};

const getNewTodoId = (todos: ToDo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(serverTodos);

  const [formData, setFormData] = useState<ToDo>(DEFAULT_VALUES);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isUserIdError, setIsUserIdError] = useState<boolean>(false);
  const { title, userId } = formData;

  const handleValueChange = (event: TypeField, fieldName: string) => {
    const value = event.target.value;

    const isUserIdField = fieldName === 'userId';

    setFormData(item => ({
      ...item,
      [fieldName]: isUserIdField ? +value : value,
      ...(isUserIdField && { user: getUserById(+value) }),
      id: getNewTodoId(todos),
      completed: false,
    }));

    if (isUserIdField) {
      setIsUserIdError(false);
    } else {
      setIsTitleError(false);
    }
  };

  const handleAddPosts = (): void => {
    setTodos(prevTodos => [...prevTodos, { ...formData }]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (!userId) {
      setIsUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    handleAddPosts();
    setIsTitleError(false);
    setIsUserIdError(false);

    setFormData(DEFAULT_VALUES);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleValueChange(event, 'title')}
            placeholder="Enter a title"
          />

          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => handleValueChange(event, 'userId')}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserIdError && !userId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
