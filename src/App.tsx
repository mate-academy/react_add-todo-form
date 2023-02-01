import {
  FC,
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => {
    return user.id === userId;
  });

  return foundUser || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [todos, setTodos] = useState(todosWithUsers);

  const largestTodoId = useMemo(() => {
    return Math.max(...todos.map(todo => todo.id));
  }, [todos]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!todoTitle || !selectedUserId) {
      setIsTitleValid(!!todoTitle);
      setIsUserSelected(!!selectedUserId);

      return;
    }

    const newTodo: Todo = {
      id: largestTodoId + 1,
      title: todoTitle,
      userId: selectedUserId,
      completed: false,
      user: getUser(selectedUserId),
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
    setTodoTitle('');
    setSelectedUserId(0);
  }

  function handleFieldChange<T>(
    setFormField: Dispatch<SetStateAction<T>>,
    newValue: T,
    setValidityField: Dispatch<SetStateAction<boolean>>,
    oldValidityValue: boolean,
  ): void {
    setFormField(newValue);

    if (!oldValidityValue) {
      setValidityField(true);
    }
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event
      .target
      .value
      .replace(/[^a-z\p{sc=Cyrillic} \d]/giu, '');

    handleFieldChange(setTodoTitle, input, setIsTitleValid, isTitleValid);
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    const newValue = +event.target.value;

    handleFieldChange(
      setSelectedUserId,
      newValue,
      setIsUserSelected,
      isUserSelected,
    );
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            name="todoTitle"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />

          {!isTitleValid
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="selectedUserId"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
