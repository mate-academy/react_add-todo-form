import './App.scss';
import { useState, FormEvent } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const [title, setTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const [titleEror, setTitleEror] = useState<string>('');
  const [userEror, setUserEror] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitleEror('');
    setUserEror('');

    let isValid = true;

    if (!title.trim()) {
      setTitleEror('Please enter a title');
      isValid = false;
    }

    if (!selectedUserId) {
      setUserEror('Please chose a  user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newTodo = {
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
      user: getUserById(selectedUserId),
    };

    setTodoList(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              const filtered = e.target.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g,
                '',
              );

              setTitle(filtered);
              setTitleEror('');
            }}
            required
          />

          {titleEror && <span className="error">{titleEror}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(Number(e.target.value));
              setUserEror('');
            }}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userEror && <span className="error">{userEror}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
