import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxTodoId = [...todosFromServer].sort((a, b) => b.id - a.id)[0].id;

const newTodo = (title: string, userId: number): Todo => ({
  id: maxTodoId,
  userId,
  title,
  completed: false,
  user: getUser(userId),
});

const addTodo = (title: string, id: number) => {
  maxTodoId += 1;
  const todo = newTodo(title, id);

  todos.push(todo);
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const validatedTitle = value.replace(/[^A-Za-zА-ЯЁа-яё ]/, '');

    setErrorTitle(false);
    setTitle(validatedTitle);
  };

  const changeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setErrorUser(false);
    setUser(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setErrorTitle(true);

      return;
    }

    if (!user) {
      setErrorUser(true);

      return;
    }

    addTodo(title, Number(user));
    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={changeTitle}
            />
          </label>
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              name="user"
              value={user}
              onChange={changeUser}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>{name}</option>
              ))}
            </select>
          </label>
          {errorUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
