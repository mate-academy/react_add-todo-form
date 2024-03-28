import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};
const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));


export const App = () => {
  const [selectedTitleValue, setSelectedTitleValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const addTodos = () => {
    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: selectedTitleValue,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    setTodos([...todos, newTodo]);
  };

  const resetFields = () => {
    setSelectedTitleValue('');
    setSelectedUserId(0);
    setIsAddClicked(false);
  };

  const submitTodo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsAddClicked(true);

    if (selectedTitleValue.trim() && selectedUserId) {
      addTodos();
      resetFields();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label>
            Title :&nbsp;&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={selectedTitleValue}
              onChange={event => setSelectedTitleValue(event.target.value)}
            />
          </label>
          {(!selectedTitleValue && isAddClicked) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;&nbsp;
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => setSelectedUserId(+event.target.value)}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user, index) => (
                <option value={index + 1} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!selectedUserId && isAddClicked && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          value="add"
          type="submit"
          data-cy="submitButton"
          onClick={submitTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
