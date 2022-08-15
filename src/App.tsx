import './App.scss';
import { useEffect, useState } from 'react';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Interfaces/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Interfaces/User';

type Errors = {
  title: boolean,
  userSelect: boolean
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [errors, setErrors] = useState<Errors>({
    title: false,
    userSelect: false,
  });

  useEffect(() => {
    setUsers(usersFromServer);

    setTodos(todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })));
  }, []);

  const formHasErrors = () => {
    let hasErrors = false;

    if (titleInput.length === 0) {
      setErrors(prev => ({ ...prev, title: true }));
      hasErrors = true;
    }

    if (userSelect === 0) {
      setErrors(prev => ({ ...prev, userSelect: true }));
      hasErrors = true;
    }

    return hasErrors;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setErrors(state => ({ ...state, title: false }));
    }

    setTitleInput(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value !== 0) {
      setErrors(state => ({ ...state, userSelect: false }));
    }

    setUserSelect(+event.target.value);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formHasErrors()) {
      return;
    }

    const maxTodoId = Math.max(...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: maxTodoId + 1,
      title: titleInput,
      completed: false,
      userId: userSelect,
      user: usersFromServer.find(user => user.id === userSelect),
    };

    setTitleInput('');
    setUserSelect(0);
    setTodos(state => [...state, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => addTodo(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={event => handleInputChange(event)}
          />
          {errors.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={(event) => handleSelectChange(event)}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userSelect && (
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

      <TodoList todos={todos} />
    </div>
  );
};
