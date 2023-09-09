import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList, Todo } from './components/TodoList/TodoList';

const firstTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(u => u.id === todo.userId),
}));

export const App = () => {
  const [submitTitleError, setSubmitTitleError] = useState(false);
  const [submitUserError, setSubmitUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(firstTodos);
  const [titleInput, setTitleInput] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const title = titleInput.trim();
    const userId = (document
      .querySelector('[data-cy="userSelect"]') as HTMLSelectElement)?.value;

    if (title && userId !== '0') {
      const newUser = usersFromServer.find(u => u.id === Number(userId));

      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id), 0) + 1,
        title,
        completed: false,
        userId: Number(userId),
        user: newUser,
      };

      setTodos([...todos, newTodo]);
      setSubmitTitleError(false);
      setSubmitUserError(false);
      setTitleInput('');
      setSelectedUser('0');
    } else {
      if (!title) {
        setSubmitTitleError(true);
      } else {
        setSubmitTitleError(false);
      }

      if (userId === '0') {
        setSubmitUserError(true);
      } else {
        setSubmitUserError(false);
      }
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    setSubmitTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setSubmitUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <div>Title:</div>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={handleTitleChange}
          />

          {submitTitleError === true
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <div>User:</div>

          <section className="UserList">
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.username}
                  value={String(user.id)}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {submitUserError === true
              && (<span className="error">Please choose a user</span>)}
          </section>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
