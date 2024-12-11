import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ITodoListItem } from './interface/ITodoListItem';
import { IUser } from './interface/IUser';
import { TodoList } from './components/TodoList';
import { useRef, useState } from 'react';

function getUserById(userId: number): IUser | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: ITodoListItem[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [todosList, setTodosList] = useState<ITodoListItem[]>(todos);
  const [titleValue, setTitleValue] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [hasTouchedTitleInput, setHasTouchedTitleInput] =
    useState<boolean>(false);
  const [hasTouchedUserInput, setHasTouchedUserInput] =
    useState<boolean>(false);
  const hasValidatedTitle = !titleValue && hasTouchedTitleInput;
  const hasValidatedUser = selectedUserId === 0 && hasTouchedUserInput;
  const findMaxId = (): number => {
    return todosList.reduce(
      (accumulator, current) =>
        accumulator > current.id ? accumulator : current.id,
      -1,
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedUser = getUserById(selectedUserId || -1);
    const newTodo: ITodoListItem = {
      id: findMaxId() + 1,
      title: titleValue,
      user: selectedUser,
      userId: selectedUser?.id || -1,
      completed: false,
    };

    if (!!titleValue && selectedUserId !== 0) {
      setTodosList(prev => [...prev, newTodo]);
      setTitleValue('');
      setSelectedUserId(0);
      setHasTouchedTitleInput(false);
      setHasTouchedUserInput(false);
    } else {
      setHasTouchedTitleInput(true);
      setHasTouchedUserInput(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleValue}
            placeholder="Enter a title"
            onChange={event => setTitleValue(event.target.value)}
            onBlur={() => setHasTouchedTitleInput(true)}
          />
          {hasValidatedTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(() => +event.target.value);
            }}
            onBlur={() => setHasTouchedUserInput(true)}
          >
            <option value="0" selected={true} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasValidatedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
