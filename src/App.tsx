import { useState } from 'react';
import './App.scss';
import { TodoList, TodoType, UserType } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Errors {
  title: string;
  user: string;
}

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('0');
  const [errors, setErrors] = useState<Errors>({ title: '', user: '' });

  const getTodos = (): TodoType[] => {
    const todos = todosFromServer.map(item => {
      return {
        ...item,
        user: usersFromServer.find(us => us.id === item.userId) as UserType,
      };
    });

    return todos;
  };

  const setTitleCustomized = (value: string) => {
    if (value.match(/^[a-zA-Z0-9\s]+$/g) || value === '') {
      setTitle(value);
    }
  };

  const [todos, setTodos] = useState<TodoType[]>(getTodos());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setErrors(prev => {
        return {
          ...prev,
          title: 'Please enter a title',
        };
      });
    }

    if (author === '0') {
      setErrors(prev => {
        return {
          ...prev,
          user: 'Please choose a user',
        };
      });
    }

    if (!title || author === '0') {
      return;
    }

    const user: UserType = usersFromServer.find(
      el => el.id.toString() === author,
    ) as UserType;

    const newTodo: TodoType = {
      userId: user.id,
      id: todos.sort((t1, t2) => t2.id - t1.id)[0].id + 1,
      title: title,
      completed: false,
      user: user,
    };

    setTodos(prev => [...prev, newTodo]);

    setAuthor('0');
    setTitle('');
    setErrors({
      title: '',
      user: '',
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => setTitleCustomized(e.target.value)}
          />
          {errors.title && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          >
            <option value="0" disabled>
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

          {errors.user && author === '0' && (
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
