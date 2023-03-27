import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const getUserById = (userId:number, users:User[]) => {
    const foundUser = users.find(user => user.id === userId);

    return foundUser || null;
  };

  const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  }));

  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [todoUserId, settodoUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const generateId = (getTodos:TodoWithUser[]) => {
    const id = Math.max(...getTodos.map((todo) => todo.id));

    return id + 1;
  };

  const addNewTodo = (todoTitle1: string, todoUserId1: number) => {
    const newTodo: TodoWithUser = {
      id: generateId(todos),
      title: todoTitle1,
      completed: false,
      userId: todoUserId1,
      user: getUserById(todoUserId, usersFromServer),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const resetForm = () => {
    setTodoTitle('');
    settodoUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = todoTitle.trim();

    setHasTitleError(!trimTitle);
    setUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    addNewTodo(todoTitle, todoUserId);
    resetForm();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    settodoUserId(+event.target.value);
    setUserIdError(false);
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
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={handleInput}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUserId}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
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
