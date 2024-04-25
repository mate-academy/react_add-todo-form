import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from './types/todo';
import { FormData } from './types/formData';
import { findTodoId } from './utils/functions';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    userName: '',
  });
  const [titleHasError, setTitleHasError] = useState(false);
  const [userHasError, setUserHasError] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (event.target.name === 'title') {
      setTitleHasError(false);
    }

    if (event.target.name === 'userName') {
      setUserHasError(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.userName) {
      setTitleHasError(!formData.title.trim());
      setUserHasError(!formData.userName);

      return;
    }

    const newTodoId = findTodoId(todos) + 1;
    const newTodo = {
      id: newTodoId,
      title: formData.title,
      completed: false,
      userId: +formData.userName,
    };

    setTodos([...todos, newTodo]);
    setFormData({
      title: '',
      userName: '',
    });
    setTitleHasError(false);
    setUserHasError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:{' '}
            <input
              id="title"
              name="title"
              type="text"
              data-cy="titleInput"
              value={formData.title}
              placeholder="Enter a title"
              onChange={handleInputChange}
            />
          </label>
          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            User{' '}
            <select
              data-cy="userSelect"
              name="userName"
              id="user"
              value={formData.userName}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>
          {userHasError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
