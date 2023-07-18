import { FormEvent, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);
  const [todoName, setTodoName] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoName.trim()) {
      setIsTitleValid(false);
    }

    if (!todoUserId) {
      setIsUserValid(false);
    }

    if (todoName.trim() && todoUserId) {
      const ids = todos.map(todo => todo.id);
      const newTodo = {
        title: todoName,
        userId: todoUserId,
        id: Math.max(...ids) + 1,
        completed: false,
        user: getUserById(todoUserId),
      };

      setTodos(prev => ([...prev, newTodo]));
      setTodoName('');
      setTodoUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            value={todoName}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={(event) => {
              setTodoName(event.target.value);
              setIsTitleValid(true);
            }}
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            id="userId"
            name="userId"
            data-cy="userSelect"
            value={todoUserId}
            onChange={(event) => {
              setTodoUserId(+event.target.value);
              setIsUserValid(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
