import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: User['id']) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNextTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const filterTitle = (oldTitle: string) => {
    return oldTitle.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g, '');
  };

  const validateForm = () => {
    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!user) {
      setUserError('Please choose a user');
    }

    return title && user;
  };

  const resetForm = () => {
    setTitle('');
    setUser(0);
    setTitleError('');
    setUserError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const newTodo: Todo = {
      id: getNextTodoId(todos),
      title: formData.get('title') as string,
      completed: false,
      userId: +(formData.get('userId') as string),
      user: getUserById(+(formData.get('userId') as string)),
    };

    setTodos(prev => [...prev, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:&nbsp;
          </label>
          <input
            name="title"
            id="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              setTitle(filterTitle(event.target.value));
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:&nbsp;
          </label>
          <select
            name="userId"
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(+event.target.value);
              setUserError('');
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(userItem => (
              <option value={userItem.id} key={userItem.id}>
                {userItem.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
