import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface AppProps {
  users: UsersItem[];
}

export const App: React.FC<AppProps> = () => {
  const selectInitialValue = 'Сhoose a user';
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(selectInitialValue);
  const [isInputError, setIsInputError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);
  const [users] = useState(usersFromServer);
  const [todos, setTodos] = useState(todosFromServer);

  const theBiggestTodoId = () => {
    const arr = todos.map(item => item.id).sort((el1, el2) => el2 - el1);

    return arr[0];
  };

  const [newCard, setNewCard] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue === '') {
      setIsInputError(true);
    }

    if (selectValue === selectInitialValue) {
      setIsSelectError(true);
    }

    setInputValue('');

    setTodos(prevTodos => [...prevTodos, newCard]);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setNewCard(prevState => ({
      ...prevState,
      id: theBiggestTodoId() + 1,
      title: event.target.value,
    }));
    if (event.target.value !== '') {
      setIsInputError(false);
    }
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    setNewCard(prevState => ({
      ...prevState,
      userId: +event.target.value,
    }));
    if (event.target.value === selectInitialValue) {
      setIsSelectError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={handleTitleInput}
          />
          <span className="error">
            {isInputError && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          {'User: '}
          <select onChange={handleUserInput} data-cy="userSelect">
            <option value="0">{selectInitialValue}</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">
            {isSelectError && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={users} todos={todos} />
    </div>
  );
};
