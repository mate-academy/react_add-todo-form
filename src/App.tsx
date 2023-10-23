import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo, TodosWithUsers } from './types/Todo';
import { TodoList } from './components/TodoList';

const todosWithUsers: TodosWithUsers[] = todosFromServer.map((todo: Todo) => {
  return {
    ...todo,
    user: usersFromServer.filter((user: User) => user.id === todo.userId)[0],
  };
});

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todos, setTodos] = useState(todosWithUsers);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) {
      setInputError(true);
    }

    if (!selectedUserId) {
      setSelectError(true);
    }

    if (!inputValue || !selectedUserId) {
      return;
    }

    const newTodo: TodosWithUsers = {
      id: (Math.max(...todos.map(elem => elem.id)) + 1),
      title: inputValue,
      completed: false,
      userId: selectedUserId,
      user: usersFromServer
        .filter((user: User) => user.id === selectedUserId)[0],
    };

    setTodos(prev => [...prev, newTodo]);
    setInputValue('');
    setSelectedUserId(0);
  };

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setSelectError(false);
  };

  const onSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
    setInputError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={inputValue}
              onChange={onSetTitle}
            />
          </label>
          {inputError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={onSelectUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
