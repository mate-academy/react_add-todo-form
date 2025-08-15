import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './interfaces/Todos';
import { TodoList } from './components/TodoList';
import { User } from './interfaces/User';
import { useState } from 'react';
import { findUserById } from './utils/findByUserId';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: findUserById(todo.userId),
    })),
  );
  const users: User[] = usersFromServer;
  const [currentOption, setCurrentOption] = useState(0);
  const [title, setTitle] = useState('');
  const [errorObj, setErrorObj] = useState({
    titleInput: false,
    nameInput: false,
  });
  const isSubmitEnabled = title.trim() && currentOption;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          const maxId =
            todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
          const newTodo = {
            id: maxId + 1,
            title: title,
            completed: false,
            userId: currentOption,
            user: findUserById(currentOption),
          };

          if (!title.trim()) {
            setErrorObj(prevState => ({
              ...prevState,
              titleInput: true,
            }));
          }

          if (!currentOption) {
            setErrorObj(prevState => ({
              ...prevState,
              nameInput: true,
            }));
          }

          if (isSubmitEnabled) {
            setTodos(prevState => [...prevState, newTodo]);
            setTitle('');
            setCurrentOption(0);
          }
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title here"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setErrorObj(prevState => ({
                ...prevState,
                titleInput: false,
              }));
            }}
          />
          {title === '' && errorObj.titleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={currentOption}
            onChange={event => {
              setCurrentOption(+event.target.value);
              setErrorObj(prevState => ({
                ...prevState,
                nameInput: false,
              }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {currentOption === 0 && errorObj.nameInput && (
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
