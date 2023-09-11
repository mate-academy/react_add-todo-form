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
  const [isSubmitTitleError, setIsSubmitTitleError] = useState(false);
  const [isSubmitUserError, setIsSubmitUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(firstTodos);
  const [titleInput, setTitleInput] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const title = titleInput.trim();

    if (title && selectedUser !== '') {
      const newUser = usersFromServer.find(u => u.id === Number(selectedUser));

      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id), 0) + 1,
        title,
        completed: false,
        userId: Number(selectedUser),
        user: newUser,
      };

      setTodos([...todos, newTodo]);
      setIsSubmitTitleError(false);
      setIsSubmitUserError(false);
      setTitleInput('');
      setSelectedUser('');
    } else {
      if (!title) {
        setIsSubmitTitleError(true);
      }

      if (selectedUser === '') {
        setIsSubmitUserError(true);
      }
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    setIsSubmitTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsSubmitUserError(false);
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

          {isSubmitTitleError === true
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

            {isSubmitUserError && (
              <span className="error">Please choose a user</span>)}
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
