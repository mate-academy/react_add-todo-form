import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { FormEvent, useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';

type GetUserById = (todoId: number) => User | null;

const getUserById: GetUserById = (todoId: number) => {
  return usersFromServer.find(user => user.id === todoId) || null;
};

const getAllIds = (array: Todo[]) => {
  const ids: number[] = [];

  array.forEach(element => ids.push(element.id));

  return ids;
};

export const App = () => {
  const [todoList, setTodoList] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const preparedTodos = todoList.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const allIds = getAllIds(preparedTodos);

  const hasNoValuesInForm = !title || user === 0;

  const handleReset = () => {
    setTitle('');
    setUser(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (user === 0) {
      setUserError(true);
    }

    if (hasNoValuesInForm) {
      return;
    }

    const newTodo = {
      id: Math.max(...allIds) + 1,
      title: title,
      completed: false,
      userId: user,
    };

    const newList = [...todoList];

    newList.push(newTodo);

    setTodoList(newList);
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          {`Title: `}
          <input
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {`User: `}
          <select
            defaultValue={0}
            value={user}
            onChange={event => {
              setUser(+event.target.value);
              setUserError(false);
            }}
            data-cy="userSelect"
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
