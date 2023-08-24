import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './type/user';
import { Todo } from './type/todo';
import { TodoList } from './components/TodoList';

type TodosFromServer = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

function getUserById(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

function setUsersInTodos(serverTodos: TodosFromServer[]): Todo[] {
  const readyTodos = serverTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }
  ));

  return readyTodos;
}

const todos = setUsersInTodos(todosFromServer);

export const App = () => {
  const [title, setTitle] = useState('');
  const [validTitle, setValidTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [validUser, setValidUser] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (!userId) {
      setValidUser(true);
    }

    if (!title.trim()) {
      setValidTitle(true);
    }

    if (userId && title.trim()) {
      todos.push(newTodo);
      setUserId(0);
      setTitle('');
      setValidUser(false);
      setValidTitle(false);
    }
  };

  type ChangeProps =
    React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;

  const setFieldValue = (event: ChangeProps) => {
    const { name, value } = event.target;

    enum InputValue {
      Title = 'title',
      UserId = 'userId',
    }

    switch (name) {
      case InputValue.Title:
        setTitle(value);
        setValidTitle(false);
        break;

      case InputValue.UserId:
        setUserId(+value);
        setValidUser(false);
        break;

      default:
        throw new Error();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={setFieldValue}
            />
          </label>

          {validTitle && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              name="userId"
              onChange={setFieldValue}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ id, name }) => {
                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {validUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
