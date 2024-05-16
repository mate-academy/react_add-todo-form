import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { User } from './types/User.type';
import { Todo } from './types/Todo.type';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | undefined => {
  const userObj = usersFromServer.find(user => user.id === userId);

  return userObj;
};

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [clicked, setClicked] = useState(false);

  const formatNewTodo = (userId: number): Todo => {
    const user: User | undefined = usersFromServer.find(u => u.id === userId);
    const ids = todos.map(todo => todo.id);

    const newTodo = {
      id: Math.max(...ids) + 1,
      title,
      completed: false,
      userId,
      user,
    };

    return newTodo;
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSelectedUserId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(+event.target.value);
  };

  const handleInsertNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClicked(true);

    if (title.trim() === '' || selectedUserId === 0) {
      return;
    }

    const newTodo: Todo = formatNewTodo(selectedUserId);

    visibleTodos.push(newTodo);

    setVisibleTodos([...visibleTodos]);

    setTitle('');
    setSelectedUserId(0);

    const defaultOption = document.querySelector('.default-option');

    if (defaultOption instanceof HTMLOptionElement) {
      defaultOption.selected = true;
    }

    setClicked(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleInsertNewTodo}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitle}
          />

          {!title && clicked && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            onChange={handleSelectedUserId}
          >
            <option className="default-option" value="0" disabled selected>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserId === 0 && clicked && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
