import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import { User } from './components/types/Users';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User =>
  usersFromServer.find(user => user.id === userId) as User;

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [hasTileEror, setHasTileEror] = useState(false);
  const [hasSelectEror, setHasSelectEror] = useState(false);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [select, setSelect] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTileEror(false);
  };

  const handleselectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+event.target.value);
    setHasSelectEror(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTileEror(!title);
    setHasSelectEror(!select);

    if (!title || !select) {
      return;
    }

    if (title && select) {
      setTitle('');
      setSelect(0);

      const onSubmit = {
        id: getNewTodoId(todos),
        title,
        completed: false,
        select,
        user: getUserById(select),
      };

      setTodos(currentTodos => [...currentTodos, onSubmit]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="userfield">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="userfield"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTileEror && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userHere">User: </label>
          <select
            data-cy="userSelect"
            id="userHere"
            value={select}
            onChange={handleselectChange}
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

          {hasSelectEror && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
