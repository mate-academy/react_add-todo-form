import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/index';
import { User } from './types/index';

enum InputErrors {
  TitleInput = 'Please enter a title',
  UserInput = 'Please choose a user',
}
function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

function getTodos(): Todo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId) as User,
  }));
}

export const App = () => {
  const [selectedUserState, setSelectedUserState] = useState(0);
  const [todos, setTodos] = useState(getTodos());
  const [title, setTitle] = useState('');
  const [isErrors, setIsErrors] = useState({
    title: '',
    user: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsErrors(errors => ({
      ...errors,
      title: '',
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserState(+e.target.value);
    setIsErrors(errors => ({
      ...errors,
      user: '',
    }));
  };

  const addTodo = (todoTitle: string, userId: number) => {
    const user = getUserById(userId) as User;
    const maxId = todos.reduce((acc, el) => Math.max(acc, el.id), 0);
    const newTodo: Todo = {
      id: maxId + 1,
      userId,
      title: todoTitle,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUserState) {
      setIsErrors(errors => ({
        ...errors,
        user: InputErrors.UserInput,
      }));
    }

    if (!title.trim()) {
      setIsErrors(errors => ({
        ...errors,
        title: InputErrors.TitleInput,
      }));
    }

    if (!selectedUserState || !title.trim()) {
      return;
    }

    addTodo(title, selectedUserState);

    setTitle('');
    setSelectedUserState(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {isErrors.title && <span className="error">{isErrors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            defaultValue={'0'}
            value={selectedUserState}
            id="user"
            name="user"
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isErrors.user && <span className="error">{isErrors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
