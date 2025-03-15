import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDo, ToDoList, User } from './utils/types';

function getToDos(todos: ToDoList[], users: User[]): ToDo[] {
  const newTodo: ToDo[] = todos.map(todo => {
    const user: User | undefined = users.find(
      userItem => userItem.id === todo.userId,
    );

    if (user) {
      return {
        user: { ...user },
        ...todo,
      };
    }

    return {
      ...todo,
    };
  });

  return newTodo;
}

const getIdTodo = (todos: ToDo[]): number => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const getUserByID = (id: number, users: User[]): User | undefined => {
  return users.find(user => user.id === id);
};

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(
    getToDos(todosFromServer, usersFromServer),
  );
  const [userSelect, setUserSelect] = useState(0);
  const [title, setTitle] = useState('');
  const [isValid, setIsValid] = useState({
    title: true,
    user: true,
  });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() && userSelect) {
      setTodos(prev => [
        ...prev,
        {
          id: getIdTodo(prev),
          title: title,
          completed: false,
          user: getUserByID(userSelect, usersFromServer),
        },
      ]);
      setIsValid(() => ({ title: true, user: true }));
      setTitle('');
      setUserSelect(0);

      return;
    }

    setIsValid(() => ({
      title: title.trim().length !== 0,
      user: Boolean(userSelect),
    }));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValid(prev => ({ title: true, user: prev.user }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            onChange={handleInput}
            value={title}
            placeholder="Enter a title"
          />
          {!isValid.title && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleSelect}
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

          {!isValid.user && !userSelect && (
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
