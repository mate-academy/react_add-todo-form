import { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './components/types/User';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './components/types/Todo';

const getUserById = (userId: number): User | null => {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
};

const newTodoId = (todosArr: Todo[]): number => {
  const todoIdArray = todosArr.map(todo => todo.id);
  const newId = Math.max(...todoIdArray) + 1;

  return newId;
};

const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(newTodos);

  const updatedTodo: Todo = {
    id: newTodoId(todos),
    userId: selectedUserId,
    title: todoTitle,
    completed: false,
    user: getUserById(selectedUserId),
  };

  const clearForm = () => {
    setTodoTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (todoTitle && selectedUserId !== 0) {
      setTodos([...todos, updatedTodo]);
      clearForm();
    }
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
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Please enter a title"
              data-cy="titleInput"
              value={todoTitle}
              pattern="^[a-zA-ZА-Яа-яЁё0-9\s]+$"
              title="Title should contain RU or EN letters, spaces and digits"
              onChange={event => {
                setTodoTitle(event.target.value);
                setHasTitleError(false);
              }}
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div
          className="field"
        >
          <label>
            User:
            <select
              name="user"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => {
                setSelectedUserId(+event.target.value);
                setHasUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>{name}</option>
              ))}
            </select>
            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
