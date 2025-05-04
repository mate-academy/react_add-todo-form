import './App.scss';
import { Todo, TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const nextId = Math.max(...todos.map(todo => todo.id), 0) + 1;

  function handleSubmit(
    event: React.FormEvent,
    inputTitle: string, // renamed from 'title'
    inputUserId: number, // renamed from 'userId'
    addTodo: (todo: Todo) => void,
  ) {
    event.preventDefault();

    setTitleError(!inputTitle);
    setUserError(!inputUserId);

    if (!inputTitle || !inputUserId) {
      return;
    }

    if (inputTitle.trim() && inputUserId) {
      setTitle('');
      setUserId(0);

      addTodo({
        id: nextId,
        title: inputTitle,
        userId: inputUserId,
        completed: false,
      });
    }
  }

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => handleSubmit(event, title, userId, handleAddTodo)}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => handleTitleChange(event)}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => handleUserChange(event)}
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
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos}></TodoList>
    </div>
  );
};
