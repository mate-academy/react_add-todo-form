import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types';
import { TodoList } from './components/TodoList';

const initialForm = {
  id: 0,
  title: '',
  userId: 0,
  completed: false,
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [formData, setFormData] = useState<Todo>(initialForm);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const { title, userId } = formData;

  const isDisabledAdd = !title.trim() || !userId;

  const getNewTodoId = (todoList: Todo[]) => {
    return Math.max(...todoList.map(todo => todo.id)) + 1;
  };

  const reset = () => {
    setFormData({ ...initialForm });
  };

  const handleAddTodo = ({ id, ...todo }: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      title: event.target.value,
    }));
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prevData => ({
      ...prevData,
      userId: +event.target.value,
    }));
    setIsUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabledAdd) {
      setIsTitleError(!title);
      setIsUserError(!userId);

      return;
    }

    handleAddTodo(formData);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
