import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoUser } from './types/ToDoInfo';

export const App = () => {
  const users = [...usersFromServer];

  const [chooseUserId, setChooseUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [todos, setTodos] = useState([...todosFromServer]);

  function findUser(userId: number) {
    return usersFromServer.find((user) => user.id === userId) || null;
  }

  const todoList = todos.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
  }));

  const clear = () => {
    setChooseUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(chooseUserId === 0);

    if (title && chooseUserId > 0) {
      const nextId = Math.max(...todos.map(x => x.id)) + 1;

      const newTodo: TodoUser = {
        id: nextId,
        title,
        completed: false,
        userId: chooseUserId,
        user: findUser(chooseUserId),
      };

      setTodos(prev => [...prev, newTodo]);

      clear();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Text"
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(!event.target.value);
            }}
          />

          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={chooseUserId}
            placeholder="Email"
            onChange={(event) => {
              setChooseUserId(+event.target.value);
              setUserError(+event.target.value === 0);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
